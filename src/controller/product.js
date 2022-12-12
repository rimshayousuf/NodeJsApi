
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
       //product Master work
        const response = await Product.create({
            pname:req.body.header.name,
            price:req.body.header.price,
            pdiscount:req.body.header.discount,
            stock:req.body.header.stock,       
          });

        //product detail work
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
      
            const id = req.params.id;
      
          const response = await Product.update({
            pname:req.body.header.name,
            price:req.body.header.price,
            pdiscount:req.body.header.discount,
            stock:req.body.header.stock,
            
          },{
            where: { pid: id}
          });

           await ProductImages.destroy({
          where: { pid: id }
    })
           //product detail work
           let images = req.body.details;
           let arr =[];
           images.map((value)=>{
              let obj ={
               pid : id,
               imgurl:value
              }
             arr.push(obj);
           });
            let pimg = await ProductImages.bulkCreate(arr);
            res.send("record updated!");
           res.json(response);
       
         } catch (e) {
           console.log(e);
         }
      }
      
      controller.get = async ( req, res) =>{
      
        try {
      
          const id = req.params.id;

          const response = await Product.findOne({
            where : { pid:id }
           })
          const images = await ProductImages.findAll({
           where : { pid:id }
           })
          response.dataValues.images = images;
          res.json(response);
  } catch (e) {
    console.log(e);
  }
}
controller.delete = async ( req, res) =>{

    try {
  
      const id = req.params.id;
  
      const response = await Product.destroy({
        where: { pid: id }
      });
      await ProductImages.destroy({
        where: { pid: id }
  })
  res.send("record deleted Successfully!");
  res.json(response);
 } 
 
 catch (e) {
        console.log(e);
      }
    }  


module.exports = controller;