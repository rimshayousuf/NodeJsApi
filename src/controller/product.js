
//import sequelize
var Sequelize = require('sequelize');

const controller ={};

// import model
var Product = require('../models/product');
var ProductImages = require('../models/productImage');
const { Op } = require("sequelize");

controller.list = async (req, res) => {

    const response = await Product.findAll()
    let products = [];
    await Promise.all(response.map( async(value)=>{
      let images = await ProductImages.findAll({where: { pid: value.pid}});
      value.dataValues.images =images;
      products.push(value);
    }));
    res.json(products);
  
  }
  
  controller.create = async ( req, res) =>{

    try {
        const response = await Product.create({
            pname:req.body.header.name,
            price:req.body.header.price,
            pdiscount:req.body.header.discount,
            stock:req.body.header.stock,       
          });
          let images = req.body.details;
          let arr =[];
          images.map((value)=>{
             let obj ={
              pid : response.pid,
              imgurl:value
             }
            arr.push(obj);
          });
           let pimg = await ProductImages.bulkCreate(arr);
          res.json(response);
      
        } catch (e) {
          console.log(e);
        }
      }
      controller.update = async ( req, res) =>{

        try {
      
            const { id } = req.params.id;
      
          const response = await Customers.update({
            pname:req.body.name,
            price:req.body.price,
            pdiscount:req.body.discount,
            stock:req.body.stock,
            
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