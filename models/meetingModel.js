const { DataTypes } = require('sequelize');
const businessConsulting = require('../connection/dbConnection.js');
const Client = require('./clientModel'); // Importing Client model
const Service = require('./serviceModel'); // Importing Service model
const Meeting = businessConsulting.define('Meeting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id',
        },
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
    }
}, {
    tableName: 'Meeting',
    timestamps: false,
});


module.exports = Meeting;