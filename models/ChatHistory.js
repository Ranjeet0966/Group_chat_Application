const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const ChatHistory = sequelize.define('chat-history', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    message: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});


module.exports = ChatHistory;