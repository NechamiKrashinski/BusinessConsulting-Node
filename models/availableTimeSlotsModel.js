const { DataTypes } = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
const BusinessHours = require('./businessHoursModel.js'); // ודא שהמודל קיים
const Client = require('./clientModel.js');
const Service = require('./serviceModel.js'); // ודא שהמודל קיים

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
            key: 'business_hour_id'
        }
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'client_id'
        }
    },
    service_id: { 
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'service_id' // ודא שהמפתח נכון
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
        type: DataTypes.ENUM('available', 'booked'),
        defaultValue: 'available'
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
