const { rows } = require("mssql");
const { BusinessConsultant, BusinessHours, AvailableTimeSlots } = require("../models/associations.js");
const { Op } = require('sequelize');

const getConsultantsByService = async (serviceId) => {
    if (!serviceId) {
        throw new Error('Service ID is required');
    }
    return await BusinessConsultant.findAll({
        include: [{
            model: ConsultantService,
            where: { service_id: serviceId }
        }]
    });
};
const getBusinessHoursByConsultants = async (consultantIds) => {
    // בדיקת תקינות: האם המערך הוא לא ריק
    if (!Array.isArray(consultantIds) || consultantIds.length === 0) {
        throw new Error('Invalid input: consultantIds must be a non-empty array.');
    }

    // שאילתת מסד נתונים לקבלת זמני פעילות
    const businessHours = await BusinessHours.findAll({
        where: {
            business_consultant_id: {
                [Op.in]: consultantIds
            },
            date: { [Op.gte]: new Date() },
            is_active: true 
        },
        attributes: ['date', 'start_time', 'end_time'],
        raw: true // מחזיר תוצאות כאובייקטים פשוטים
    });

    // הסרת כפילויות
    const uniqueBusinessHours = [];
    const seenDates = new Set();

    businessHours.forEach(hour => {
        const dateKey = `${hour.date}-${hour.start_time}-${hour.end_time}`;
        if (!seenDates.has(dateKey)) {
            seenDates.add(dateKey);
            uniqueBusinessHours.push(hour);
        }
    });

    return uniqueBusinessHours;
};

const getBusinessHoursByDatesAndConsultants = async (dates, consultantIds) => {
    // בדיקת תקינות: האם המערך הוא לא ריק
    if (!Array.isArray(dates) || dates.length === 0) {
        throw new Error('Invalid input: dates must be a non-empty array.');
    }

    // בדיקת תקינות: האם המערך של מזהי ה-Business Consultant הוא לא ריק
    if (!Array.isArray(consultantIds) || consultantIds.length === 0) {
        throw new Error('Invalid input: consultantIds must be a non-empty array.');
    }

    const businessHours = await BusinessHours.findAll({
        where: {
            business_consultant_id: {
                [Op.in]: consultantIds
            },
            date: {
                [Op.in]: dates
            },
            is_active: true
        },
        attributes: ['id', 'date', 'start_time', 'end_time'],
        include: [{
            model: BusinessConsultant,
            attributes: ['name']
        }],
        raw: true
    });

    return businessHours;
};

const getAvailableSlotsByBusinessHour = async (businessHourId) =>{
    if(!businessHourId){
        throw new Error('Invalid input: businessHourId can not be null')
    }
    const availableSlots = await AvailableTimeSlots.findAll({
        where: {
            business_hour_id:businessHourId,
            status: 'available'
        },
        attributes: [,'date', 'start_time', 'end_time'],
        include: [{
            model: BusinessHours,
            include: [{
                model: BusinessConsultant,
                attributes: ['name']
            }],
           
            //אני רוצה להחזיר כאן את שם היועץ
        }],
        raw: true
    });
    if(!availableSlots){
        return null
    }
    return availableSlots
}
const getAvailableSlotsByConsultantsAndDates = async (dates, consultantIds) => {
    // בדיקת תקינות: האם המערך של תאריכים הוא לא ריק
    if (!Array.isArray(dates) || dates.length === 0) {
        throw new Error('Invalid input: dates must be a non-empty array.');
    }

    // בדיקת תקינות: האם המערך של מזהי היועצים הוא לא ריק
    if (!Array.isArray(consultantIds) || consultantIds.length === 0) {
        throw new Error('Invalid input: consultantIds must be a non-empty array.');
    }
    //-------------------------------------
    const businessHours = await getBusinessHoursByDatesAndConsultants(dates, consultantIds);
    let availableSlots = []
    for (let businessHour in businessHours) {
        const available_slots = await getAvailableSlotsByBusinessHour(businessHour.id);
        if(!available_slots){
            const v = {
                'date':businessHour.date,
                'start_time':businessHour.start_time,
                'end_time':businessHour.end_time,
                'name':businessHour.name
            } 
            availableSlots.push(v)
        }
            
        else{
            availableSlots.push(available_slots)
        }
        
    }
    return availableSlots.map(slot => ({
        date: slot.date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        consultant_name:slot.name
    }));
};


module.exports = {
    getConsultantsByService,
    getBusinessHoursByConsultants,
    getBusinessHoursByDatesAndConsultants,
    getAvailableSlotsByConsultantsAndDates
}