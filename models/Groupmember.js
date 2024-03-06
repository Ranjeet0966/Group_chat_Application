const Sequelize= require('sequelize');
const sequelize = require('../util/database');

const Groupmember= sequelize.define('groupmember',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    }
})

module.exports = Groupmember;