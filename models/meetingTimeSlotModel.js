const { DataTypes } = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
const Meeting = require('./meetingModel.js'); // ייבוא מודל הפגישה
const MeetingTimeSlot = BusinessConsulting.define('MeetingTimeSlot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    start_time: { // שעת התחלה
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: { // שעת סיום
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'booked'), // סטטוסים אפשריים
        allowNull: false,
        defaultValue: 'available'
    },
    
    meeting_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // יכול להיות ריק אם הזמן פנוי
        references: {
            model: Meeting, 
            key: 'id' // הנחה שה-ID של הפגישה בטבלה הזו הוא 'id'
        }
    }
}, {
    tableName: 'MeetingTimeSlots', // שם הטבלה במסד הנתונים
    timestamps: false
});

module.exports = MeetingTimeSlot; // ייצוא המודל