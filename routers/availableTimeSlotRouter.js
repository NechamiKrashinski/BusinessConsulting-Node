const express = require('express');
const router = express.Router();
const {
    createMeeting,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    getMeetingsForClient // הוספת הפונקציה החדשה
} = require('../controllers/meetingController');

// Route ליצירת זמן פגישה
router.post('/', createMeeting);

// Route לקבלת כל זמני הפגישות
router.get('/', getMeeting);

// Route לעדכון זמן פגישה לפי ID
router.put('/:id', updateMeeting);

// Route למחיקת זמן פגישה לפי ID
router.delete('/:id', deleteMeeting);

// Route לקבלת מפגשים עבור לקוח לפי ID
router.get('/meeting/:clientId', getMeetingsForClient); // הוספת הנתיב החדש

module.exports = router;
