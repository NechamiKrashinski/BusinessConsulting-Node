const express = require('express');
//require('../api-docs/meetingTimeSlotSwagger.json');
const router = express.Router();
const {
    createMeetingTimeSlot,
    getMeetingTimeSlots,
    updateMeetingTimeSlot,
    deleteMeetingTimeSlot,
    
} = require('../controllers/meetingTimeSlotController');

// Route ליצירת זמן פגישה
router.post('/', createMeetingTimeSlot);

// Route לקבלת כל זמני הפגישות
router.get('/', getMeetingTimeSlots);

// Route לעדכון זמן פגישה לפי ID
router.put('/:id', updateMeetingTimeSlot);

// Route למחיקת זמן פגישה לפי ID
router.delete('/:id', deleteMeetingTimeSlot);


module.exports = router;