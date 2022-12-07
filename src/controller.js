//import sequelize
var Sequelize = require('sequelize');

const express = require("express");

const controller ={};

controller.index = (req,res) =>{

    const data ={
        name: "rimsha",
        age: 23,
        gender: 'female',
        canvote:true,
    }

    res.json(data);
};


module.exports = controller;