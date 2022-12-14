
//import sequelize
var Sequelize = require('sequelize');

const controller = {};

// import model
var Customers = require('../models/customer');
const { Op } = require("sequelize");

controller.list = async (req, res) => {
console.log('list call')
  const response = await Customers.findAll()
    .then(function (data) {
      const res = { success: true, data: data }
      return res;
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })
  res.json(response);

}

controller.create = async (req, res) => {

  try {
    const response = await Customers.create({
      Password: req.body.password,
      cname: req.body.name,
      cemail: req.body.email,
      caddress: req.body.address,
      cphone: req.body.phone,
      cprofile: req.body.profile
    })
      .then(function (data) {
        const res = { success: true, data: data, message: "created successful" }
        return res;
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res;
      })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}
controller.update = async (req, res) => {

  try {

    const  id  = req.params.id;

    const response = await Customers.update({
      Password: req.body.password,
      cname: req.body.name,
      cemail: req.body.email,
      caddress: req.body.address,
      cphone: req.body.phone,
      cprofile: req.body.profile
    }, {
      where: { id: id }
    })
      .then(function (data) {
        const res = { success: true, data: data, message: "updated successful" }
        return res;
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res;
      })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

controller.get = async (req, res) => {

  try {

    const  id  = req.params.id;

    const response = await Customers.findAll({
      where: { cid: id }
      // where: { id: [ 1, 2, 4 ] }
      // like: { name: "Milan" }
      // where: {
      //   name: {
      //     [Op.like]: '%Milan%'
      //   }
      // }
    })
      .then(function (data) {
        const res = { success: true, data: data }
        return res;
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res;
      })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}
controller.delete = async (req, res) => {

  try {

    const  id = req.params.id;

    const response = await Customers.destroy({
      where: { id: id }
    })
      .then(function (data) {
        const res = { success: true, data: data, message: "Deleted successful" }
        return res;
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res;
      })
    res.json(response);
  } catch (e) {
    console.log(e);
  }
}


module.exports = controller;