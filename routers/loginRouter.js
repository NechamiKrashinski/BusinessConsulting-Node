const express = require('express');
//require('../api-docs/loginSwagger');
const { registerClient, loginClient,registerManager } = require('../controllers/loginController');

const router = express.Router();

router.post('/register', registerClient);
router.post('/', loginClient);
router.post('/registerManager', registerManager);

module.exports = router;
