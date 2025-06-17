// routes/businessDetailRoutes.js
const express = require('express');
const {
    createBusinessDetail,
    getBusinessDetails,
    updateBusinessDetail,
    deleteBusinessDetail
} = require('../controllers/businessDetailsController');

const routerBusinessDetail = express.Router();

// יצירת פרטי עסק
routerBusinessDetail.post('/', createBusinessDetail);

// קבלת כל פרטי העסקים
routerBusinessDetail.get('/', getBusinessDetails);

// עדכון פרטי עסק לפי ID
routerBusinessDetail.put('/:id', updateBusinessDetail);

// מחיקת פרטי עסק לפי ID
routerBusinessDetail.delete('/:id', deleteBusinessDetail);

module.exports = routerBusinessDetail;
