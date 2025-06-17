const Client = require('./clientModel'); 
const Service = require('./serviceModel'); // ייבוא מודל Service
const Meeting = require('./meetingModel'); // ייבוא מודל Meeting
const MeetingTimeSlot = require('./meetingTimeSlotModel'); // ייבוא מודל MeetingTimeSlot
     
// User.js
// לאחר הגדרת כל המודלים
Client.hasMany(Meeting, { foreignKey: 'client_id' });
Meeting.belongsTo(Client, { foreignKey: 'client_id' });

Service.hasMany(Meeting, { foreignKey: 'service_id' });
Meeting.belongsTo(Service, { foreignKey: 'service_id' });

Meeting.hasMany(MeetingTimeSlot, { foreignKey: 'meeting_id' });
MeetingTimeSlot.belongsTo(Meeting, { foreignKey: 'meeting_id' });

module.exports = {
    Client,
    Service,
    Meeting,
    MeetingTimeSlot
};