const { Meeting, Service, Client, BusinessHours, BusinessConsultant } = require('../models/associations.js');
const { Op } = require('sequelize');

// פונקציות ניהול פגישות
const createMeeting = async (businessHourId, serviceId, clientId, date, startTime, endTime, notes = '') => {
    // 1. בדיקות תקינות של הפרמטרים
    if (!businessHourId || !date || !startTime || !endTime || !serviceId || !clientId) {
        throw new Error('All parameters are required.');
    }

    // 2. בדוק אם השירות קיים
    const serviceExists = await Service.findByPk(serviceId);
    if (!serviceExists) {
        throw new Error('Service does not exist.');
    }
    
    const client = await Client.findByPk(clientId);
    if (!client) {
        throw new Error('Client does not exist.');
    }

    // 3. בדיקה האם שעת הפעילות קיימת
    const businessHour = await BusinessHours.findOne({
        where: { id: businessHourId },
    });

    if (!businessHour) {
        throw new Error('Business Hour not found.');
    }
    
    const { start_time: businessStartTime, end_time: businessEndTime } = businessHour;
    const consultantId = businessHour.business_consultant_id; // הנחה שהיועץ שמור בטבלה זו

    // 4. בדיקה אם היועץ קיים 
    const businessConsultant = await BusinessConsultant.findOne({
        where: { id: consultantId },
    });

    if (!businessConsultant) {
        throw new Error('Business Consultant not found.');
    }

    // 5. קבלת זמני הפגישות הפנויים
    const meetings = await getAvailableTimes([date], [consultantId]);

    // 6. בדוק אם הזמן שביקש הלקוח פנוי
    const isSlotAvailable = meetings.some(slot =>
        slot.start_time <= startTime && slot.end_time >= endTime
    );

    if (!isSlotAvailable) {
        throw new Error('The selected time slot is not available.');
    }

    // 7. יצירת הפגישה
    const meeting = await Meeting.create({
        business_hour_id: businessHourId,
        client_id: clientId,
        service_id: serviceId,
        date: date,
        start_time: startTime,
        end_time: endTime,
        status: 'booked',
        notes: notes,
    });

    return meeting; // מחזיר את הפגישה שנוצרה
};

const updateMeeting = async (id, meetingData) => {
    await Meeting.update(meetingData, { where: { id } });
};

const deleteMeeting = async (id) => {
    await Meeting.destroy({ where: { id } });
};

const getMeetings = async (clientId) => {
    return await Meeting.findAll({
        include: [
            {
                model: Meeting,
                attributes: ['date', 'start_time', 'end_time', 'status'],
                include: [
                    {
                        model: Service,
                        attributes: ['name'],
                    },
                    {
                        model: Client,
                        attributes: ['name', 'email'],
                        where: { id: clientId }
                    }
                ]
            }
        ]
    });
};

// פונקציות לקבלת יועצים לפי שירות
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

// const getBusinessHoursByConsultants = async (consultantIds) => {
//     if (!Array.isArray(consultantIds) || consultantIds.length === 0) {
//         throw new Error('Invalid input: consultantIds must be a non-empty array.');
//     }

//     const businessHours = await BusinessHours.findAll({
//         where: {
//             business_consultant_id: {
//                 [Op.in]: consultantIds
//             },
//             date: { [Op.gte]: new Date() },
//             is_active: true 
//         },
//         attributes: ['date', 'start_time', 'end_time'],
//         raw: true 
//     });

//     const uniqueBusinessHours = [];
//     const seenDates = new Set();

//     businessHours.forEach(hour => {
//         const dateKey = `${hour.date}-${hour.start_time}-${hour.end_time}`;
//         if (!seenDates.has(dateKey)) {
//             seenDates.add(dateKey);
//             uniqueBusinessHours.push(hour);
//         }
//     });

//     return uniqueBusinessHours;
// };




// פונקציות לקבלת שעות עסקים ופגישות
const getBusinessHours = async (businessConsultantId, formattedDate) => {
    return await BusinessHours.findAll({
        where: {
            business_consultant_id: businessConsultantId,
            date: formattedDate,
            is_active: true
        }
    });
};

const getBookedMeetings = async (formattedDate, businessHours) => {
    return await Meeting.findAll({
        where: {
            date: formattedDate,
            business_hour_id: businessHours.map(hour => hour.id),
            status: ['booked', 'confirmed']
        }
    });
};

const calculateAvailableTimes = (businessHours, bookedTimes) => {
    const availableTimes = [];
    businessHours.forEach(hour => {
        let currentStart = hour.start_time;

        bookedTimes.forEach(booked => {
            if (booked.start >= hour.end_time) return;

            if (booked.start > currentStart) {
                availableTimes.push({
                    start: currentStart,
                    end: booked.start
                });
            }

            currentStart = Math.max(currentStart, booked.end);
        });

        if (currentStart < hour.end_time) {
            availableTimes.push({
                start: currentStart,
                end: hour.end_time
            });
        }
    });

    return availableTimes.filter(time => time.start < time.end);
};

const getAvailableTimes = async (dates, businessConsultantIds) => {
    if (!dates || !businessConsultantIds || !Array.isArray(dates) || !Array.isArray(businessConsultantIds)) {
        throw new Error('Invalid input: dates and businessConsultantIds must be non-null arrays');
    }

    const availableTimesByConsultant = {};

    for (const businessConsultantId of businessConsultantIds) {
        availableTimesByConsultant[businessConsultantId] = {};

        for (const date of dates) {
            const formattedDate = new Date(date).toISOString().split('T')[0];
            const businessHours = await getBusinessHours(businessConsultantId, formattedDate);
            const bookedMeetings = await getBookedMeetings(formattedDate, businessHours);
            const bookedTimes = bookedMeetings.map(meeting => ({
                start: meeting.start_time,
                end: meeting.end_time
            }));

            const availableTimes = calculateAvailableTimes(businessHours, bookedTimes);
            availableTimesByConsultant[businessConsultantId][formattedDate] = availableTimes;
        }
    }

    return availableTimesByConsultant;
};

module.exports = {
    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting,
    getAvailableTimes,
    getConsultantsByService
    
};