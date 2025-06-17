// routes/businessDetailRoutes.js
const express = require('express');
const {
    createClient,
    getClients,
    updateClient,
    deleteClient
} = require('../controllers/clientController');

const routerClient = express.Router();

// יצירת פרטי עסק
routerClient.post('/', createClient);

// קבלת כל פרטי העסקים
routerClient.get('/', getClients);

// עדכון פרטי עסק לפי ID
routerClient.put('/:id', updateClient);

// מחיקת פרטי עסק לפי ID
routerClient.delete('/:id', deleteClient);

module.exports = routerClient;
