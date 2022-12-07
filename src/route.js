
const express = require('express');
const route = express();

//importing controller
const Customercontroller = require('./controller/customer');
const Ordercontroller = require('./controller/order');
const Productcontroller = require('./controller/product');

//creating route
//route.get('/index', controller.index);
route.get('/customer/list',Customercontroller.list);
route.post('/customer/create',Customercontroller.create);
route.put('/customer/update/:id',Customercontroller.update);
route.get('/customer/get/:id',Customercontroller.get);
route.delete('/customer/delete/:id',Customercontroller.delete);

//importing controller


//creating route
//route.get('/index', controller.index);
route.get('/order/list',Ordercontroller.list);
route.post('/order/create',Ordercontroller.create);
route.put('/order/update/:id',Ordercontroller.update);
route.get('/order/get/:id',Ordercontroller.get);
route.delete('/order/delete/:id',Ordercontroller.delete);

//importing controller

//creating route
//route.get('/index', controller.index);
route.get('/product/list',Productcontroller.list);
route.post('/product/create',Productcontroller.create);
route.put('/product/update/:id',Productcontroller.update);
route.get('/product/get/:id',Productcontroller.get);
route.delete('/product/delete/:id',Productcontroller.delete);


//export route
module.exports = route;