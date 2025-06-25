const { AvailableTimeSlots } = require('../models/associations');
const { getMeetings} = require('../services/meetingService'); // נוודא שהנתיב נכון

const createAvailableTimeSlots = async (req, res) => {
    try {
        const availableTimeSlot = await AvailableTimeSlots.create(req.body);
        res.status(201).json(availableTimeSlot);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating meeting time slot');
    }
};

const getAvailableTimeSlots = async (req, res) => {
    try {
        const availableTimeSlots = await AvailableTimeSlots.findAll();
        res.json(availableTimeSlots);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching meeting time slots');
    }
};

const updateAvailableTimeSlots = async (req, res) => {
    try {
        const { id } = req.params;
        await AvailableTimeSlots.update(req.body, { where: { id } });
        res.status(200).send('Meeting time slot updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating meeting time slot');
    }
};

const deleteAvailableTimeSlots = async (req, res) => {
    try {
        const { id } = req.params;
        await AvailableTimeSlots.destroy({ where: { id } });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting meeting time slot');
    }
};

const getMeetingsForClient = async (req, res) => {
    const { clientId } = req.params; // נניח שה-ID של הלקוח מועבר בכתובת ה-URL

    try {
        const meetings = await getMeetings(clientId);
        res.json(meetings);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching meetings for client');
    }
};

module.exports = {
    createAvailableTimeSlots,
    getAvailableTimeSlots,
    updateAvailableTimeSlots,
    deleteAvailableTimeSlots,
    getMeetingsForClient // הוספת פונקציה חדשה
};
