
//import sequelize
var Sequelize = require('sequelize');

const controller = {};

// import model
var OrderDetail = require('../models/orderDetail');
var OrderMaster = require('../models/orderMaster');
const { Op } = require("sequelize");
const Product = require('../models/product');

controller.list = async (req, res) => {

  const response = await OrderMaster.findAll()
  let ProductOrder = [];
  //Details Work
  await Promise.all(response.map(async (value) => {
    value.amount = 0;
    let detail = await OrderDetail.findAll({ where: { oid: value.oid } });
    detail.map((val) => {
      val.dataValues.total = val.quantity * val.rate;
      value.dataValues.amount += val.quantity * val.rate;
    });
    value.dataValues.detail = detail;

    ProductOrder.push(value);
  }));

  res.json(response);

}

controller.create = async (req, res) => {

  try {

    const response = await OrderMaster.create({
      cid: req.body.header.cid,
      orderno: req.body.header.orderno,
      orderdate: new Date(),
      amount: req.body.header.amount,
      item: req.body.details.length,
      discount: req.body.header.discount,
      status: "Pending",
      isaprove: req.body.header.isaprove
    });
    let order = req.body.details;
    let array = [];
    await Promise.all(order.map(async (value) => {
      let product = await Product.findOne({ where: { pid: value.pid } });
      if (product) {
        let obj = {
          oid: response.oid,
          pid: value.pid,
          quantity: value.quantity,
          rate: product.price
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
controller.update = async (req, res) => {

  try {

    const id = req.params.id;

    const response = await OrderMaster.update({
      cid: req.body.header.cid,
      orderno: req.body.header.orderno,
      orderdate: new Date(),
      amount: req.body.header.amount,
      item: req.body.details.length,
      discount: req.body.header.discount,
      status: "Pending",
      isaprove: req.body.header.isaprove
    }
      , {
        where: { oid: id }
      })
    let result = await OrderDetail.destroy({
      where: { oid: id }
    })
    let order = req.body.details;
    let array = [];
    await Promise.all(order.map(async (value) => {
      let product = await Product.findOne({ where: { pid: value.pid } });
      if (product) {
        let obj = {
          oid: id,
          pid: value.pid,
          quantity: value.quantity,
          rate: product.price
        }
        array.push(obj);
      }
    }));
    let customerOrder = await OrderDetail.bulkCreate(array);

    res.send("record updated!");
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

controller.get = async (req, res) => {

  try {

    const  id  = req.params.id;

    const response = await OrderMaster.findOne({
      where: { oid: id }  
    });
     const order_detail = await OrderDetail.findAll({
       where : {oid:id}
     })
     response.dataValues.order_detail = order_detail;
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}
controller.delete = async (req, res) => {

  try {

    const  id  = req.params.id;

    const response = await OrderMaster.destroy({
      where: { oid: id }
      });
      await OrderDetail.destroy({
        where: { oid: id }
  })
  res.send("record deleted Successfully!");
    
    res.json(response);
  } catch (e) {
    console.log(e);
  }
}


module.exports = controller;