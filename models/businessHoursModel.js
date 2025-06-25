const { DataTypes } = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
const {BusinessConsultant} = require('./associations.js');

const BusinessHours = BusinessConsulting.define('BusinessHours', {
    business_hour_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    consultant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: BusinessConsultant, // ודא שהמודל קיים
            key: 'consultant_id'
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
    }
});

module.exports = BusinessHours;