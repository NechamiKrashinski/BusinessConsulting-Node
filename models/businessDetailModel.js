const DataTypes = require('sequelize');
const businessConsulting = require('../connection/dbConnection.js');
const BusinessDetail = businessConsulting.define('BusinessDetail', {
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
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        validator: {
            isEmail: true,
        }
    },
    website: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: false,
});
module.exports = BusinessDetail; 