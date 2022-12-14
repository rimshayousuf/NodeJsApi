//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var OrderMaster = sequelize.define('Order_Master', {
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

module.exports = OrderMaster;
