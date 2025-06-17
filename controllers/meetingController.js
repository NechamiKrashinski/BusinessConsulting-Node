
const {Meeting } = require('../models/associations.js')

const createMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.create(req.body);
        res.status(201).json(meeting);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating meeting');
    }
};

const getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.findAll();
        res.json(meetings);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching meetings');
    }
};

const updateMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        await Meeting.update(req.body, { where: { id } });
        res.status(200).send('Meeting updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating meeting');
    }
};

const deleteMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        await Meeting.destroy({ where: { id } });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting meeting');
    }
};

module.exports = {
    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting,
};