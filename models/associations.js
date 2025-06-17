const Client = require('./clientModel'); // ייבוא מודל Client (שמשמש כמשתמש)
const Service = require('./serviceModel'); // ייבוא מודל Service
const Meeting = require('./meetingModel'); // ייבוא מודל Meeting
const MeetingTimeSlot = require('./meetingTimeSlotModel'); // ייבוא מודל MeetingTimeSlot

// הגדרת הקשרים
Client.hasMany(Meeting, { foreignKey: 'client_id' }); 
Meeting.belongsTo(Client, { foreignKey: 'client_id' }); 

Service.hasMany(Meeting, { foreignKey: 'service_id' }); 
Meeting.belongsTo(Service, { foreignKey: 'service_id' }); 

Meeting.hasMany(MeetingTimeSlot, { foreignKey: 'meeting_id' }); 
MeetingTimeSlot.belongsTo(Meeting, { foreignKey: 'meeting_id' }); 

module.exports = { Client, Service, Meeting, MeetingTimeSlot }; 