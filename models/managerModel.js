// models/Manager.js
const { DataTypes } = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');

const Manager = BusinessConsulting.define('Manager', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
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
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'manager'
    }
}, {
    tableName: 'Manager',
    timestamps: false,
});

module.exports = Manager;
