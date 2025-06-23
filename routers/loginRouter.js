const express = require('express');
//require('../api-docs/loginSwagger');
const { registerManager,registerClient, loginClient } = require('../controllers/loginController');

const router = express.Router();

router.post('/register', registerClient);
router.post('/add-manager', registerManager); // Assuming this is for adding a manager
router.post('/', loginClient);

module.exports = router;
