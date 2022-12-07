//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var OrderDetail = sequelize.define('OrderDetail', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  oid: Sequelize.INTEGER,
  pid: Sequelize.INTEGER,
  rate: Sequelize.DECIMAL,
  quantity: Sequelize.INTEGER,
  
});

module.exports = OrderDetail;
