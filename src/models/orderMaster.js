//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Order = sequelize.define('OrderMaster', {
  oid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cid: Sequelize.INTEGER,
  orderno: Sequelize.INTEGER,
  orderdate: Sequelize.DATE,
  amount: Sequelize.DECIMAL,
  item: Sequelize.INTEGER,
  discount: Sequelize.DECIMAL,
  status: Sequelize.STRING,
  isaprove: Sequelize.BOOLEAN
});

module.exports = Order;
