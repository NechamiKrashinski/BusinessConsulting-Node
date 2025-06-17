const { DataTypes } = require('sequelize');
const businessConsulting = require('../connection/dbConnection.js');
const Service = businessConsulting.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER, // משך השירות בדקות
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    tableName: 'Service', // שם הטבלה במסד הנתונים
    timestamps: false });

module.exports = Service;
