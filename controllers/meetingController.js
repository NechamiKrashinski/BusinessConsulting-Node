const meetingService = require('../services/meetingService.js');

const createMeeting = async (req, res) => {
    try {
        const meeting = await meetingService.createMeeting(req.body);
        res.status(201).json(meeting);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating meeting');
    }
};

const updateMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        await meetingService.updateMeeting(id, req.body);
        res.status(200).send('Meeting updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating meeting');
    }
};

const deleteMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        await meetingService.deleteMeeting(id);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting meeting');
    }
};

const getMeetings = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const meetings = await meetingService.getMeetings(clientId);
        res.status(200).json(meetings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving meetings' });
    }
};

module.exports = {
    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting,
};
