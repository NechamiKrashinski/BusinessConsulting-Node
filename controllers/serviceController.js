const {Service} = require('../models/associations.js');

const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating service');
    }
};

const getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching services');
    }
};

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        await Service.update(req.body, { where: { id } });
        res.status(200).send('Service updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating service');
    }
};

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await Service.destroy({ where: { id } });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting service');
    }
};

module.exports = {
    createService,
    getServices,
    updateService,
    deleteService,
};