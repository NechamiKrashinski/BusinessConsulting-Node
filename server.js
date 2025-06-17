const express = require('express');
const businessConsulting = require('./connection/dbConnection');
const businessDetailsRouter = require('./routers/businessDetailsRouter'); // ייבוא הראוטים
const clientRouter = require('./routers/clientRouter'); // ייבוא הראוטים
const meetingRouter = require('./routers/meetingRouter'); // ייבוא הראוטים
const serviceRouter = require('./routers/serviceRouter'); // ייבוא הראוטים
const meetingTimeSlotRouter = require('./routers/meetingTimeSlotRouter'); // ייבוא הראוטים

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const startServer = async () => {
    try {
        // חיבור למסד הנתונים
        await businessConsulting.authenticate();
        console.log('Connection has been established successfully.');

        // סנכרון המודלים עם מסד הנתונים
        await businessConsulting.sync({ alter: true }); // זה ייצור את הטבלאות מחדש
        console.log('Database & tables created!');

        // הגדרת הראוטים לאחר שהחיבור הצליח
        app.use('/businessDetailsRouter', businessDetailsRouter);
        app.use('/clientRouter', clientRouter);
        app.use('/meetingRouter', meetingRouter);
        app.use('/serviceRouter', serviceRouter);
        app.use('/meetingTimeSlotRouter', meetingTimeSlotRouter);
 
        // הפעלת השרת
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        }); 
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

// הפעלת השרת
startServer();
 