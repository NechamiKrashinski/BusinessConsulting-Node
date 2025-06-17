const { DataTypes } = require('sequelize');
const businessConsulting = require('../connection/dbConnection.js');

const BusinessDetails = businessConsulting.define('BusinessDetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true, // לוודא שהדוא"ל בפורמט תקני
        },
    },
    owner_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
}, {
    tableName: 'BusinessDetails', // שם הטבלה במסד הנתונים
    timestamps: false,
});

module.exports = BusinessDetails; // ייצוא המודל
