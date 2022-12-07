//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../database');

var pImages = sequelize.define('ProductImages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pid: Sequelize.INTEGER,
  imgurl: Sequelize.STRING
});

module.exports = pImages;
