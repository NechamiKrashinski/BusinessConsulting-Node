const Service = require('../models/serviceModel.js');

const getServices = async () => {
    return await Service.findAll();
};
// פונקציה ליצור שירות חדש
const createService = async (serviceData) => {
    return await Service.create(serviceData);
};

// פונקציה לעדכן שירות קיים
const updateService = async (id, serviceData) => {
    await Service.update(serviceData, { where: { id } });
};

// פונקציה למחוק שירות
const deleteService = async (id) => {
    await Service.destroy({ where: { id } });
};

module.exports = {
    createService,
    updateService,
    deleteService
};