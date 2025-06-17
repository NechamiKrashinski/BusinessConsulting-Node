require('dotenv').config();
const express = require('express');
const BusinessConsulting = require('./connection/dbConnection');
const businessDetailRoutes = require('./routers/businessDetailRouter');
const clientRoutes = require('./routers/clientRouter'); 
const meetingRoutes = require('./routers/meetingRouter');
const meetingTimeSlotRoutes = require('./routers/meetingTimeSlotRouter');
const serviceRoutes = require('./routers/serviceRouter');
const loginRouter = require('./routers/loginRouter');
const { authenticateToken } = require('./middleware/authMiddleware');
const { swaggerDocs, swaggerUi } = require('./swagger.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/login',loginRouter);
//app.use(authenticateToken);
app.use('/business-details', businessDetailRoutes);
app.use('/clients', clientRoutes);
app.use('/meetings', meetingRoutes);
app.use('/meeting-time-slots', meetingTimeSlotRoutes);
app.use('/services', serviceRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const startServer = async () => {
    try {
        await BusinessConsulting.authenticate();
        console.log('Connection has been established successfully.');

        await BusinessConsulting.sync({ force: false });
        console.log('Database & tables synchronized!');

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

startServer();