const { addBusinessHours, getBusinessHoursByConsultant, updateBusinessHours } = require('../services/businessHourService');

 const createBusinessHours= async (req, res) => {
        try {
            const result = await addBusinessHours(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

  const  readBusinessHoursByConsultant= async (req, res) => {
        try {
            const hours = await getBusinessHoursByConsultant(req.params.consultantId);
            res.status(200).json(hours);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

  const  putBusinessHours= async (req, res) => {
        try {
            await updateBusinessHours(req.params.consultantId, req.body.date, req.body.newStartTime, req.body.newEndTime);
            res.status(200).json({ message: 'Business hours updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

module.exports = {createBusinessHours, readBusinessHoursByConsultant, putBusinessHours};