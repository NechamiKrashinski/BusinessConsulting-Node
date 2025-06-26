const { Meeting, AvailableTimeSlots, Service, Client } = require('../models/associations.js');

const createMeeting = async (meetingData) => {
    return await Meeting.create(meetingData);
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
