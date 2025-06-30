const express = require('express');
//require('../api-docs/serviceSwagger.json');
const router = express.Router();
const {
    // createService,
    // getServices,
    // updateService,
    // deleteService
    readServices
} = require('../controllers/serviceController');

// Route ליצירת שירות
// router.post('/', createService);

// // Route לקבלת כל השירותים
// router.get('/', getServices);

// // Route לעדכון שירות לפי ID
// router.put('/:id', updateService);

// // Route למחיקת שירות לפי ID
// router.delete('/:id', deleteService);
router.get('/', readServices);

module.exports = router;