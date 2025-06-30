const { DataTypes } = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
const BusinessDetail = require('./businessDetailsModel.js');
const BusinessConsultant = require('./businessConsultantModel.js');
const Client = require('./clientModel.js');
const Service = require('./serviceModel.js');
const AvailableTimeSlots = require('./availableTimeSlotsModel.js');
const BusinessHours = require('./businessHoursModel.js');
const ConsultantService = require('./consultantServiceModel.js');

// הגדרת הקשרים
BusinessConsultant.hasMany(BusinessHours, {
    foreignKey: 'business_consultant_id',
    onDelete: 'CASCADE'
});
BusinessHours.belongsTo(BusinessConsultant, {
    foreignKey: 'business_consultant_id'
});

BusinessHours.hasMany(AvailableTimeSlots, {
    foreignKey: 'business_hour_id',
    onDelete: 'CASCADE'
});
AvailableTimeSlots.belongsTo(BusinessHours, {
    foreignKey: 'business_hour_id'
});

Client.hasMany(AvailableTimeSlots, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});
AvailableTimeSlots.belongsTo(Client, {
    foreignKey: 'client_id'
});

Service.hasMany(ConsultantService, {
    foreignKey: 'service_id',
    onDelete: 'CASCADE'
});
ConsultantService.belongsTo(Service, {
    foreignKey: 'service_id'
});

BusinessConsultant.hasMany(ConsultantService, {
    foreignKey: 'consultant_id',
    onDelete: 'CASCADE'
});
ConsultantService.belongsTo(BusinessConsultant, {
    foreignKey: 'consultant_id'
});

// הגדר את הקשרים בין AvailableTimeSlots ל-Service
AvailableTimeSlots.belongsTo(Service, {
    foreignKey: 'service_id'
});

// אם יש צורך להוסיף קשרים נוספים, ניתן להוסיף כאן

module.exports = {
    BusinessConsultant,
    BusinessDetail,
    BusinessHours,
    Client,
    Service,
    AvailableTimeSlots,
    ConsultantService
};