const { DataTypes } = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
const BusinessConsultant = require('./businessConsultantModel.js');
const Service = require('./serviceModel.js');

const ConsultantService = BusinessConsulting.define('ConsultantService', {
    consultant_service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    consultant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: BusinessConsultant,
            key: 'consultant_id'
        }
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'service_id'
        }
    }
});

module.exports = ConsultantService;