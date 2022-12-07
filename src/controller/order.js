
//import sequelize
var Sequelize = require('sequelize');

const controller ={};

// import model
var Order = require('../models/orderDetail');
const { Op } = require("sequelize");

controller.list = async (req, res) => {

    const response = await Order.findAll()
    .then(function(data){
      const res = { success: true, data: data }
      return res;
    })
    .catch(error =>{
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);
  
  }
  
  controller.create = async ( req, res) =>{

    try {
        const response = await Customers.create({
            cid:req.body.id,
            orderno:req.body.orderno,
            orderdate:req.body.date,
            amount:req.body.amount,
            item: req.body.item,
            discount: req.body.discount,
            status: req.body.status,
            isaprove: req.body.aprove
            
          })
          .then(function(data){
            const res = { success: true, data: data, message:"created successful" }
            return res;
          })
          .catch(error=>{
            const res = { success: false, error: error }
            return res;
          })
          res.json(response);
      
        } catch (e) {
          console.log(e);
        }
      }
      controller.update = async ( req, res) =>{

        try {
      
            const { id } = req.params.id;
      
          const response = await Customers.update({
            cid:req.body.id,
            orderno:req.body.orderno,
            orderdate:req.body.date,
            amount:req.body.amount,
            item: req.body.item,
            discount: req.body.discount,
            status: req.body.status,
            isaprove: req.body.aprove
            
          },{
            where: { id: id}
          })
          .then(function(data){
            const res = { success: true, data: data, message:"updated successful" }
            return res;
          })
          .catch(error=>{
            const res = { success: false, error: error }
            return res;
          })
          res.json(response);

        } catch (e) {
          console.log(e);
        }
      }
      
      controller.get = async ( req, res) =>{
      
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
controller.delete = async ( req, res) =>{

    try {
  
      const { id } = req.params.id;
  
      const response = await Customers.destroy({
        where: { id: id }
      })
      .then( function(data){
        const res = { success: true, data: data, message:"Deleted successful" }
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