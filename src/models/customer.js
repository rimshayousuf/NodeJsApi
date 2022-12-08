//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Customers = sequelize.define('customers', {
  cid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Password: Sequelize.STRING,
  cname: Sequelize.STRING,
  cemail: Sequelize.STRING,
  caddress: Sequelize.STRING,
  cphone: Sequelize.BIGINT,
  cprofile: Sequelize.STRING
});

module.exports = Customers;
