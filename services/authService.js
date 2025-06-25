const { Client,BusinessConsultant } = require('../models/associations.js');
// const BusinessConsultant = require('../models/businessConsultantModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (email, role) => {
    return jwt.sign({ email, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
};

class AuthService {
    async registerClient(data) {
        const { name, phone, email, password } = data;

        if (!name || !email || !password) {
            throw new Error('Please provide all required fields');
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
            throw new Error('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
        }

        const existingClient = await Client.findOne({ where: { email } });

        if (existingClient) {
            throw new Error('Client already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const client = await Client.create({
            name,
            phone,
            email,
            password: hashedPassword,
        });

        if (!client) {
            throw new Error('Error creating client');
        }

        return generateToken(client.email, 'client');
    }

    async loginClient(data) {
        const { email, password } = data;

        if (!email || !password) {
            throw new Error('Please provide email and password');
        }

        const manager = await BusinessConsultant.findOne({ where: { email: email } });
        if (manager && await bcrypt.compare(password, manager.password)) {
            return generateToken(manager.email, 'manager');
        }

        const client = await Client.findOne({ where: { email: email } });
        if (!client || !(await bcrypt.compare(password, client.password))) {
            throw new Error('Invalid email or password');
        }

        return generateToken(client.email, 'client');
    }

    async registerBusinessConsultant(data) {
        const { name, phone, email, password } = data;

        if (!name || !email || !password) {
            throw new Error('Please provide all required fields');
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
            throw new Error('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
        }

        const existingBusinessConsultant = await BusinessConsultant.findOne({ where: { email } });

        if (existingBusinessConsultant) {
            throw new Error('BusinessConsultant already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const manager = await BusinessConsultant.create({
            name,
            phone,
            email,
            password: hashedPassword,
            role: 'manager',
        });

        if (!manager) {
            throw new Error('Error creating manager');
        }

        return generateToken(manager.email, 'manager');
    }
}

module.exports = new AuthService();
