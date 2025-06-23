const { MeetingTimeSlot, Meeting, Service, Client } = require('../models/associations.js');

// const createMeeting = async (req, res) => {
//     try {
//         const meeting = await Meeting.create(req.body);
//         res.status(201).json(meeting);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error creating meeting');
//     }
// };

// const getMeetings = async (req, res) => {
//     try {
//         const meetings = await Meeting.findAll();
//         res.json(meetings);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching meetings');
//     }
// };

// const updateMeeting = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Meeting.update(req.body, { where: { id } });
//         res.status(200).send('Meeting updated');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error updating meeting');
//     }
// };

// const deleteMeeting = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Meeting.destroy({ where: { id } });
//         res.status(204).send();
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error deleting meeting');
//     }
// };

const getMeetings = async (req, res) => {
    try {
        const clientId = req.params.clientId;

        const meetings = await MeetingTimeSlot.findAll({
            include: [
                {
                    model: Meeting,
                    attributes: ['date', 'start_time', 'end_time', 'status'], // רק פרטי הפגישה
                    include: [
                        {
                            model: Service,
                            attributes: ['name'], // רק שם השירות
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

        res.status(200).json(meetings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving meetings' });
    }
};

module.exports = {
    // createMeeting,
    getMeetings,
    // updateMeeting,
    // deleteMeeting,
};