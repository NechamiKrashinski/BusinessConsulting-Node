const { Client } = require('../models/associations.js');
const Manager = require('../models/managerModel.js');
const jwt = require('jsonwebtoken');

const getProfile = async (token) => {
    if (!token) {
        throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const role = decoded.role;

    if (role !== 'client' && role !== 'manager') {
        throw new Error('Access denied');
    }

    if (role === 'manager') {
        const manager = await Manager.findOne({ where: { email: email } });
        if (!manager) {
            throw new Error('Manager not found');
        }
        return {
            id: manager.id,
            name: manager.name,
            phone: manager.phone,
            email: manager.email,
            role: 'manager',
        };
    }

    const client = await Client.findOne({ where: { email: email } });
    if (!client) {
        throw new Error('Client not found');
    }

    return {
        id: client.id,
        name: client.name,
        phone: client.phone,
        email: client.email,
        role: 'client',
    };
};

module.exports = {
    getProfile,
};
