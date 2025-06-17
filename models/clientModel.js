// models/User.js
const { DataTypes } = require('sequelize');
const businessConsulting = require('../connection/dbConnection.js');

const Client = businessConsulting.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Client', // שם הטבלה במסד הנתונים
    timestamps: true, // מאפשר שדות תאריך
    createdAt: 'createdAt', // שדה תאריך יצירה
    updatedAt: false });

module.exports = Client;
