const express = require('express');
const router = express.Router();
const {
    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting
} = require('../controllers/meetingController');

// Route ליצירת פגישה
router.post('/', createMeeting);

// Route לקבלת כל הפגישות
router.get('/', getMeetings);

// Route לעדכון פגישה לפי ID
router.put('/:id', updateMeeting);

// Route למחיקת פגישה לפי ID
router.delete('/:id', deleteMeeting);

module.exports = router;