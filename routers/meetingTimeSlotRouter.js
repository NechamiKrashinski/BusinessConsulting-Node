// routes/businessDetailRoutes.js
const express = require('express');
const {
    createMeetingTimeSlot,
    getMeetingTimeSlots,
    updateMeetingTimeSlot,
    deleteMeetingTimeSlot
} = require('../controllers/meetingTimeSlotController');

const routerMeetingTimeSlot = express.Router();

// יצירת פרטי עסק 
routerMeetingTimeSlot.post('/', createMeetingTimeSlot);

// קבלת כל פרטי העסקים
routerMeetingTimeSlot.get('/', getMeetingTimeSlots);

// עדכון פרטי עסק לפי ID
routerMeetingTimeSlot.put('/:id', updateMeetingTimeSlot);

// מחיקת פרטי עסק לפי ID
routerMeetingTimeSlot.delete('/:id', deleteMeetingTimeSlot);

module.exports = routerMeetingTimeSlot;
