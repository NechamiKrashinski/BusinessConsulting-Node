const {Client} = require('../models/associations.js');
const Manager = require('../models/managerModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

const generateToken = (email,role) => {
    return jwt.sign({ email, role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
        ,
    });
}

const registerClient = asyncHandler(async (req, res) => {
    console.log("Registering client with data:", req.body);
    
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
        name: client.name,
        phone: client.phone,
        email: client.email,
        role: 'client',
        token: `Bearer ${generateToken(client.email,'client')}`,
    });}
    else {
        res.status(500);
        throw new Error('Error creating client');
    }
});

const loginClient = asyncHandler(async (req, res) => {
    console.log('Logging in client with data:', req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    const manager = await Manager.findOne({ where: { email: email } }); // תיקון כאן
    if (manager && await bcrypt.compare(password, manager.password)) {
        res.status(200);
        return res.json({
            name: manager.name,
            phone: manager.phone,
            email: manager.email,
            role: manager.role,
            token: `Bearer ${generateToken(manager.email, manager.role)}`,
        });
    }

    const client = await Client.findOne({ where: { email: email } });
    console.log("Logging in client with email:", email);
    console.log("Client found:", client);    
    
    if (!client || !(await bcrypt.compare(password, client.password))) {
        res.status(401);
        console.log(client+"client");
        
        throw new Error('Invalid email or password');
    }

    res.json({
        name: client.name,
        phone: client.phone,
        email: client.email,
        role: 'client',
        token: `Bearer ${generateToken(client.email, 'client')}`,
    });
});

module.exports = {
    registerClient,
    loginClient,
};