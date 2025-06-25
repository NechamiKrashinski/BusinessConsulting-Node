const AvailableTimeSlots = require('./availableTimeSlotsModel');
const BusinessConsultant = require('./businessConsultantModel');
const BusinessDetail = require('./businessDetailsModel');
const BusinessHours = require('./businessHoursModel');
const Client = require('./clientModel');
const ConsultantService = require('./consultantServiceModel.js');
const Service = require('./serviceModel.js');

BusinessConsultant.hasMany(BusinessHours, {
    foreignKey: 'consultant_id',
    onDelete: 'CASCADE', // אם יימחק יועברו גם השורות הקשורות
});

BusinessHours.belongsTo(BusinessConsultant, {
    foreignKey: 'consultant_id',
});

BusinessHours.hasMany(AvailableTimeSlots, {
    foreignKey: 'business_hour_id',
    onDelete: 'CASCADE',
});

AvailableTimeSlots.belongsTo(BusinessHours, {
    foreignKey: 'business_hour_id',
});

Client.hasMany(AvailableTimeSlots, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE',
});

AvailableTimeSlots.belongsTo(Client, {
    foreignKey: 'client_id',
});
AvailableTimeSlots.belongsTo(Service, {
    foreignKey: 'service_id',
});

Service.hasMany(AvailableTimeSlots, {
    foreignKey: 'service_id',
});
// BusinessDetail.hasMany(BusinessConsultant, {
//     foreignKey: 'business_id',
//     onDelete: 'SET NULL', // אם יימחק, הערך יתעדכן ל-NUL
// });

// BusinessConsultant.belongsTo(BusinessDetail, {
//     foreignKey: 'business_id',
// });

BusinessConsultant.hasMany(ConsultantService, {
    foreignKey: 'consultant_id',
    onDelete: 'CASCADE',
});

ConsultantService.belongsTo(BusinessConsultant, {
    foreignKey: 'consultant_id',
});

Service.hasMany(ConsultantService, {
    foreignKey: 'service_id',
    onDelete: 'CASCADE',
});

ConsultantService.belongsTo(Service, {
    foreignKey: 'service_id',
});
module.exports = {
    AvailableTimeSlots,
    BusinessConsultant,
    BusinessDetail,
    BusinessHours,
    Client,
    ConsultantService,
    Service,
};
