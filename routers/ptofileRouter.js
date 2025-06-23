const express = require('express');
//require('../api-docs/clientSwagger');
const router = express.Router();
const {
    getProfile,
} = require('../controllers/profileController');

router.get('/', getProfile);



module.exports = router;