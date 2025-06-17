const express = require('express');
const {
    createService,
    getServices,
    updateService,
    deleteService
} = require('../controllers/serviceController');

const routerService = express.Router();

// יצירת פרטי עסק
routerService.post('/', createService);

// קבלת כל פרטי העסקים
routerService.get('/', getServices);

// עדכון פרטי עסק לפי ID
routerService.put('/:id', updateService);

// מחיקת פרטי עסק לפי ID
routerService.delete('/:id', deleteService);

module.exports = routerService;
