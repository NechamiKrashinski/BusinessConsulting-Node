const { Client } = require('../models/associations.js');
const Manager = require('../models/managerModel.js');

const jwt = require('jsonwebtoken'); 


const getProfile = async (req, res) => {
    try {
        console.log("Fetching profile for user");
        
        // קבלת התוקן מה-header
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).send('No token provided');
        }

        // פענוח התוקן
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // החלף ב-secret key שלך

        const email = decoded.email; // הנחה שהמייל נמצא ב-claims
        const role = decoded.role; // הנחה שה-role נמצא ב-claims
        console.log("Decoded token:", decoded);
        

        // בדיקת ה-role
        if (role !== 'client' && role !== 'manager') {
            return res.status(403).send('Access denied');
        }
        if(role === 'manager') {
            // חיפוש מנהל
            const manager = await Manager.findOne({ where: { email: email } });

            if (!manager) {
                return res.status(404).send('Manager not found');
            }

            return res.status(200).json(
              {
                    id: manager.id,
                    name: manager.name,
                    phone: manager.phone,
                    email: manager.email,
                    role: 'manager',
                }
            );
        }

        console.log("before client search");
        
        // חיפוש לקוח
        const client = await Client.findOne({ where: { email: email } });
        console.log("Client found:", client);
        
        if (!client) {
            return res.status(404).send('Client not found');
        }

        return res.status(200).json({
            user: {
                id: client.id,
                name: client.name,
                phone: client.phone,
                email: client.email,
                role: 'client',
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching clients');
    }
};

module.exports = {
    getProfile,
};

   