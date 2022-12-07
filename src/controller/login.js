
//import sequelize
var Sequelize = require('sequelize');

const controller = {};

// import model
var Customers = require('../models/customer');
const { Op } = require("sequelize");

controller.login = async (req, res) => {
    
    let email= req.body.email;
    let password = req.body.password;

    try {
      
          const { id } = req.params.id;
      
          const response = await Customers.findAll({
            where: { id: id}
            // where: { id: [ 1, 2, 4 ] }
            // like: { name: "Milan" }
            // where: {
            //   name: {
            //     [Op.like]: '%Milan%'
            //   }
     // }
    })
    .then( function(data){
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

controller.register = async (req, res) => {

    try {
        const response = await Customers.create({
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

module.exports = controller;