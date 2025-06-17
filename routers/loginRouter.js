const express = require('express');
//require('../api-docs/loginSwagger');
const { registerClient, loginClient } = require('../controllers/loginController');

const router = express.Router();

router.post('/register', registerClient);
router.post('/', loginClient);

module.exports = router;
