const {Sequelize} = require('sequelize');

const businessConsulting = new Sequelize('BusinessConsulting',process.env.DB_USER,process.env.DB_PASSWORD
    ,{
    host: process.env.DB_HOST,
    dialect: 'mssql',
    port: process.env.DB_PORT, // Default port for MSSQL
    dialectOptions: {
        options: {
            encrypt: false, // Use encryption for the connection
            trustServerCertificate: true // Trust the server certificate
        }
    },
    logging:false
});

module.exports = businessConsulting;