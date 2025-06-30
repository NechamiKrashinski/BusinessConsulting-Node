const { Meeting, AvailableTimeSlots, Service, Client,BusinessHours, BusinessConsultant } = require('../models/associations.js');

const createMeeting = async (businessHourId, serviceId,clientId, date, startTime, endTime,notes = '') => {
    // 1. בדיקות תקינות של הפרמטרים
    if (!businessHourId || !date || !startTime || !endTime || !serviceId|| !clientId) {
        throw new Error('All parameters are required.');
    }

    // 2. בדוק אם השירות קיים
    const serviceExists = await Service.findByPk(serviceId);
    if (!serviceExists) {
        throw new Error('Service does not exist.');
    }
    const client = await Client.findByPk(clientId);
    if(!client){
        throw new Error('client does not exist');
    }

    // 3.בדיקה האם שעת הפעילות קיימת
    const businessHour = await BusinessHours.findOne({
        where: { id: businessHourId },
        
    });

    if (!businessHour) {
        throw new Error('Business Power not found.');
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
    const availableSlots = await getAvailableSlotsByConsultantsAndDates([date], [consultantId]);

    // 6. בדוק אם הזמן שביקש הלקוח פנוי
    const isSlotAvailable = availableSlots.some(slot =>
        slot.start_time <= startTime && slot.end_time >= endTime
    );

    if (!isSlotAvailable) {
        throw new Error('The selected time slot is not available.');
    }

    // 7. יצירת הפגישה
    const availableTimeSlots = await AvailableTimeSlots.create({
        date: date,
        start_time: startTime,
        end_time: endTime,
        service_id: serviceId,
        consultant_id: consultantId,
        status: 'booked'
    });

    
    // הוספת זמני פגישות פנויים חדשים
    await AvailableTimeSlots.bulkCreate([
        { date: date, start_time: businessStartTime, end_time: startTime, status: 'available', business_hour_id: consultantId },
        { date: date, start_time: endTime, end_time: businessEndTime, status: 'available', business_hour_id: consultantId }
    ]);

    return appointment; // מחזיר את הפגישה שנוצרה
};


const updateMeeting = async (id, meetingData) => {
    await Meeting.update(meetingData, { where: { id } });
};

const deleteMeeting = async (id) => {
    await Meeting.destroy({ where: { id } });
};

const getMeetings = async (clientId) => {
    return await AvailableTimeSlots.findAll({
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

module.exports = {
    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting,
};
