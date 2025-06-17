// models/Client.js
const  DataTypes  = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');

const Client = BusinessConsulting.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Client', // שם הטבלה במסד הנתונים
    timestamps: true,// אם אין שדות זמן
    createdAt: 'created_at', // שם השדה של יצירת רשומה
    updatedAt: false // שם השדה של עדכון רשומה
});
 
module.exports = Client;