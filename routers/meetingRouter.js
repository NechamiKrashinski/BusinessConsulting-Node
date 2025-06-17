// routes/businessDetailRoutes.js
const express = require('express');
const {
    createMeeting,
    getMeetings,
    updateMeeting,
    deleteMeeting
} = require('../controllers/meetingController');

const routerMeeting = express.Router();

// יצירת פרטי עסק
routerMeeting.post('/', createMeeting);

// קבלת כל פרטי העסקים
routerMeeting.get('/', getMeetings);

// עדכון פרטי עסק לפי ID
routerMeeting.put('/:id', updateMeeting);

// מחיקת פרטי עסק לפי ID
routerMeeting.delete('/:id', deleteMeeting);

module.exports = routerMeeting;
