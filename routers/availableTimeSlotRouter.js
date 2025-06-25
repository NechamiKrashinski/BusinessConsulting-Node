const express = require('express');
const router = express.Router();
const {
    createAvailableTimeSlots,
    getAvailableTimeSlots,
    updateAvailableTimeSlots,
    deleteAvailableTimeSlots,
    getMeetingsForClient // הוספת הפונקציה החדשה
} = require('../controllers/availableTimeSlotsController');

// Route ליצירת זמן פגישה
router.post('/', createAvailableTimeSlots);

// Route לקבלת כל זמני הפגישות
router.get('/', getAvailableTimeSlots);

// Route לעדכון זמן פגישה לפי ID
router.put('/:id', updateAvailableTimeSlots);

// Route למחיקת זמן פגישה לפי ID
router.delete('/:id', deleteAvailableTimeSlots);

// Route לקבלת מפגשים עבור לקוח לפי ID
router.get('/meeting/:clientId', getMeetingsForClient); // הוספת הנתיב החדש

module.exports = router;
