const { DataTypes } = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
const BusinessDetail = require('./businessDetailsModel.js');

const BusinessConsultant = BusinessConsulting.define('BusinessConsultant', {
    consultant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // business_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: BusinessDetail,
    //         key: 'business_id'
    //     }
    // }
});

module.exports = BusinessConsultant;