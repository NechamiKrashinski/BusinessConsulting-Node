const {Client} = require('../models/associations.js');
const clientController = require('../controllers/clientController.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

const generateToken = (password) => {
    return jwt.sign({ password }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
}

const registerClient = asyncHandler(async (req, res) => {
    const { name, phone, email, password } = req.body;
    console.log("Registering client with data:", req.body);
    
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
        res.status(400);
        throw new Error('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
    }

    const existingClient = await Client.findOne({ where: { email } });

    if (existingClient) {
        res.status(400);
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

    if (client){
    res.status(201).json({
        id: client.id,
        name: client.name,
        phone: client.phone,
        email: client.email,
        token: `Bearer ${generateToken(client.password)}`,
    });}
    else {
        res.status(500);
        throw new Error('Error creating client');
    }
});

const loginClient = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    const client = await Client.findOne({ where: { email } });
try {
    const clients = await Client.findAll();
    console.log(clients);
} catch (error) {
    console.error('Error fetching clients:', error);
}

    if (!client || !(await bcrypt.compare(password, client.password))) {
        res.status(401);
        console.log(client+"client");
        
        throw new Error('Invalid email or password');
    }

    res.json({
        id: client.id,
        name: client.name,
        phone: client.phone,
        email: client.email,
        token: `Bearer ${generateToken(client.password)}`,
    });
});

module.exports = {
    registerClient,
    loginClient,
};