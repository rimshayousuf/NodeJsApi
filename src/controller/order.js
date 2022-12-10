
//import sequelize
var Sequelize = require('sequelize');

const controller ={};

// import model
var OrderDetail = require('../models/orderDetail');
var OrderMaster = require('../models/orderMaster');
const { Op } = require("sequelize");
const Product = require('../models/product');

controller.list = async (req, res) => {

    const response = await OrderMaster.findAll()
    let ProductOrder = [];
    //Details Work
    await Promise.all(response.map( async(value)=>{
      value.amount = 0;
      let detail = await OrderDetail.findAll({where: { oid: value.oid}});
      detail.map((val)=>{
           val.dataValues.total = val.quantity * val.rate;
           value.dataValues.amount += val.quantity * val.rate;
      });
      value.dataValues.detail = detail;
       
      ProductOrder.push(value);
    }));

    res.json(response);
  
  }
  
  controller.create = async ( req, res) =>{

    try {
   
        const response = await OrderMaster.create({
            cid:req.body.header.cid,
            orderno:req.body.header.orderno,
            orderdate:new Date(),
            amount:req.body.header.amount,
            item: req.body.details.length,
            discount: req.body.header.discount,
            status: "Pending",
            isaprove: req.body.header.isaprove  
          });
          let order = req.body.details;
          let array =[];
        await Promise.all(order.map( async (value) =>{
            let product = await Product.findOne({where:{pid:value.pid}});
            if (product) {
              let obj = {
                oid: response.oid,
                pid: value.pid,
                quantity: value.quantity,
                rate:product.price
              }
              array.push(obj);
            }
          }));
          let customerOrder = await OrderDetail.bulkCreate(array); 

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