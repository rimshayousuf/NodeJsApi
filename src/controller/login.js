
//import sequelize
var Sequelize = require('sequelize');

const controller = {};
const jwt =  require('jsonwebtoken');
const settings = require('../../appConfig');
const useragent = require('useragent');
const _ = require('lodash');
// import model
var Customers = require('../models/customer');
const { Op } = require("sequelize");

controller.login = async (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  try {

    const response = await Customers.findOne({
      where: { cemail: email }
    });
    if (response) {
      if (response.Password === password) {
        const agent = useragent.parse(req.headers["user-agent"]);

        let signvalues = {
          Session: req.body.Session,
          OS: agent.os.toString(),
          WebBrowser: agent.toString(),
          Ver: agent.toVersion(),
          HardWare: agent.device.toString(),
        };

        const token = jwt.sign(signvalues, settings.JWT_KEY, {
          expiresIn: "365d",
        });
        response.dataValues.token = token;
        delete response.dataValues.Password;
        delete response.dataValues.createdAt;
        delete response.dataValues.updatedAt;

        let obj = {
          success : true,
          message : "Login Success!",
          data:response
        }
        res.json(obj);
      }
      else {
        res.status(203).json({ message: "Password Not Match" });

      }
    }

  } catch (e) {
    console.log(e);
  }

}

// controller.register = async (req, res) => {

//   try {
//     const response = await Customers.create({
//       cname: req.body.name,
//       cemail: req.body.email,
//       caddress: req.body.address,
//       cphone: req.body.phone,
//       cprofile: req.body.profile
//     })
//       .then(function (data) {
//         const res = { success: true, data: data, message: "created successful" }
//         return res;
//       })
//       .catch(error => {
//         const res = { success: false, error: error }
//         return res;
//       })
//     res.json(response);

//   } catch (e) {
//     console.log(e);
//   }
// }

module.exports = controller;