require('dotenv').config();
const cors = require('cors');
const express = require('express');
const BusinessConsulting = require('./connection/dbConnection');
const businessDetailRoutes = require('./routers/businessDetailRouter');
const clientRoutes = require('./routers/clientRouter'); 
const availableTimeSlotsRoutes = require('./routers/availableTimeSlotRouter.js');
const serviceRoutes = require('./routers/serviceRouter');
const loginRouter = require('./routers/authRouter');
const profileRouter = require('./routers/profileRouter');
const { authenticateToken } = require('./middleware/authMiddleware');
const { swaggerDocs, swaggerUi } = require('./swagger.js');
const BusinessConsultant = require('./models/businessConsultantModel.js');
const BusinessHours = require('./models/businessHoursModel.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use(authenticateToken); 
app.use('/business-details', businessDetailRoutes);
app.use('/clients', clientRoutes);
app.use('/meeting', availableTimeSlotsRoutes);
app.use('/services', serviceRoutes);

const startServer = async () => {
    try {
        await BusinessConsulting.authenticate();
        console.log('Connection has been established successfully.');

        // סנכרון המודלים כאן
        await BusinessConsulting.sync({ force:true  }); 
        console.log('Database & tables synchronized!');

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};


startServer();
