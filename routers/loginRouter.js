const express = require('express');
const { registerClient, loginClient } = require('../controllers/clientController');
const { authenticateToken } = require('../middleware/authMiddleware'); // ייבוא המידלוויר אם יש צורך להשתמש בו

const router = express.Router();
router.post('/register', registerClient);
router.get('/login', loginClient);

module.exports = router;