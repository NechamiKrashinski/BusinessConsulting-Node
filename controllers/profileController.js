const jwt = require('jsonwebtoken');
const { Client } = require('../models/associations.js');
const Manager = require('../models/managerModel.js');

const getProfile = async (req, res) => {
    try {

        // הנחה שהטוקן נמצא בכותרת Authorization
        const token = req.headers.authorization?.split(' ')[1]; // מפצל את הכותרת כדי לקבל את הטוקן

        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }

        // פרוק הטוקן כדי לקבל את המידע
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // החלף את 'your_secret_key' במפתח הסודי שלך

        const userRole = decoded.role; // הנחה שה-role נמצא בטוקן
        const email = decoded.email; // הנחה שה-email נמצא בטוקן
       console.log('Decoded token:++++++++', userRole, email);
        // במקרה של מנהל, מחזירים את פרטי המנהל
        if (userRole === 'manager') {
            const user = await Manager.findOne({ where: { email } });
            if (!user) {
                return res.status(404).send('Manager not found');
            }
            console.log("return manager");
            
            return res.status(200).json(user);
        }

        // במקרה של לקוח, מחזירים את פרטי הלקוח
        if (userRole === 'client') {
            const client = await Client.findOne({ where: { email } });
            if (!client) {
                return res.status(404).send('Client not found');
            }
            console.log("return client");
            
            return res.status(200).json(client);
        } 

        // אם ה-role לא מוכר
        return res.status(403).send('Access denied');
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching clients');
    }
};

module.exports = {
    getProfile
};
