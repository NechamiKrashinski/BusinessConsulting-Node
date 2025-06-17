const express = require('express');
const router = express.Router();
const {
    createService,
    getServices,
    updateService,
    deleteService
} = require('../controllers/serviceController');

// Route ליצירת שירות
router.post('/', createService);

// Route לקבלת כל השירותים
router.get('/', getServices);

// Route לעדכון שירות לפי ID
router.put('/:id', updateService);

// Route למחיקת שירות לפי ID
router.delete('/:id', deleteService);

module.exports = router;