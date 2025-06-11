const  DataTypes  = require('sequelize');
const BusinessConsulting = require('../connection/dbConnection.js');
const Client = require('./clientModel.js'); // ייבוא מודל הלקוח
const Service = require('./serviceModel.js'); // ייבוא מודל השירות
const Meeting = BusinessConsulting.define('Meeting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id',
        },
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
    }
}, {
    tableName: 'Meeting', // שם הטבלה במסד הנתונים
    timestamps: false
});

module.exports = Meeting; // ייצוא המודל