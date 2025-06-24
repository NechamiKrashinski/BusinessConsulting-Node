const AuthService = require('../services/authService');
const asyncHandler = require('express-async-handler');

const registerClient = asyncHandler(async (req, res) => {
    try {
        const token = await AuthService.registerClient(req.body);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const loginClient = asyncHandler(async (req, res) => {
    try {
        const token = await AuthService.loginClient(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

const registerManager = asyncHandler(async (req, res) => {
    try {
        const token = await AuthService.registerManager(req.body);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = {
    registerClient,
    loginClient,
    registerManager
};
