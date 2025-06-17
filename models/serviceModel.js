const  DataTypes  = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
const Service = BusinessConsulting.define('Service', {
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
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'Service', // שם הטבלה במסד הנתונים
    timestamps: false, // אם אין שדות זמן
   
});
module.exports = Service;
