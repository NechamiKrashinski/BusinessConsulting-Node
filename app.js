require('dotenv').config();
const cors = require('cors');
const express = require('express');
const BusinessConsulting = require('./connection/dbConnection');
const { swaggerDocs, swaggerUi } = require('./swagger.js');

// Routers
const businessDetailRoutes = require('./routers/businessDetailRouter');
const clientRoutes = require('./routers/clientRouter'); 
const serviceRoutes = require('./routers/serviceRouter');
const loginRouter = require('./routers/authRouter');
const profileRouter = require('./routers/profileRouter');
const consultantServiceRouter = require('./routers/consultantServiceRouter.js');
const businessHoursRoutes = require('./routers/businessHoursRouter.js')
const { authenticateToken } = require('./middleware/authMiddleware');
const { swaggerDocs, swaggerUi } = require('./swagger.js');

const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
app.use('/login', loginRouter);
app.use(authenticateToken); 
app.use('/profile', profileRouter);
app.use('/consultant-services', consultantServiceRouter);
app.use('/business-details', businessDetailRoutes);
app.use('/clients', clientRoutes);
app.use('/business-hours', businessHoursRoutes);
// app.use('/meeting', availableTimeSlotsRoutes);
app.use('/services', serviceRoutes);

const startServer = async () => {
    try {
        await BusinessConsulting.authenticate();
        console.log('Connection has been established successfully.');

        // Sync models here
        await BusinessConsulting.sync({ force: true }); 
        console.log('Database & tables synchronized!');

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

startServer();
