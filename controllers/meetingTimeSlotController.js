const {MeetingTimeSlot} = require('../models/associations.js');
const createMeetingTimeSlot = async (req, res) => {
    try {
        const meetingTimeSlot = await MeetingTimeSlot.create(req.body);
        res.status(201).json(meetingTimeSlot);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating meeting time slot');
    }
};

const getMeetingTimeSlots = async (req, res) => {
    try {
        const meetingTimeSlots = await MeetingTimeSlot.findAll();
        res.json(meetingTimeSlots);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching meeting time slots');
    }
};

const updateMeetingTimeSlot = async (req, res) => {
    try {
        const { id } = req.params;
        await MeetingTimeSlot.update(req.body, { where: { id } });
        res.status(200).send('Meeting time slot updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating meeting time slot');
    }
};

const deleteMeetingTimeSlot = async (req, res) => {
    try {
        const { id } = req.params;
        await MeetingTimeSlot.destroy({ where: { id } });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting meeting time slot');
    }
};




module.exports = {
    createMeetingTimeSlot,
    getMeetingTimeSlots,
    updateMeetingTimeSlot,
    deleteMeetingTimeSlot,
};