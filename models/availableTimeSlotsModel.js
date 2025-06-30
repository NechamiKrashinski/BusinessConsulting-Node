const { DataTypes } = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
// const BusinessHours = require('./businessHoursModel.js');
// const Client = require('./clientModel.js');
// const Service = require('./serviceModel.js');
const {Service,Client,BusinessHours} = require('./associations.js'); // Importing from associations.js

const AvailableTimeSlots = BusinessConsulting.define('AvailableTimeSlots', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    business_hour_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: BusinessHours,
            key: 'id'
        }
    },
    client_id: { 
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id'
        }
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Service,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('booked','confirmed','cancelled'),
        defaultValue: 'booked'
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 250],
                msg: "The notes must be between 0 and 250 characters long."
            }
        }
    },
}, {
    tableName: 'AvailableTimeSlots',
    timestamps: false,
});

module.exports = AvailableTimeSlots;