//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var Product = sequelize.define('products', {
  pid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pname: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  pdiscount: Sequelize.DECIMAL,
  stock: Sequelize.INTEGER,
  
});

module.exports = Product;
