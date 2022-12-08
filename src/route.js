
const express = require('express');
const router = express.Router();
const {checkAuth} = require("./middleware/validateauth");

//importing controller
const Customercontroller = require('./controller/customer');
const Ordercontroller = require('./controller/order');
const Productcontroller = require('./controller/product');
const Logincontroller = require('./controller/login');

//creating router
//router.get('/index', controller.index);
// router.get('/customer/list',CheckAuth.checkauth,Customercontroller.list);

router.get('/customer/list',checkAuth, (req, res)=> {
    Customercontroller.list(req,res)
})


router.post('/login', Logincontroller.login);
router.post('/customer/create', Customercontroller.create);
router.put('/customer/update/:id', Customercontroller.update);
// router.get('/customer/get/:id', CheckAuth,function (req, res) {
//     Customercontroller.get(req,res)
// });
router.delete('/customer/delete/:id', Customercontroller.delete);

//importing controller


//creating router
//router.get('/index', controller.index);
router.get('/order/list', Ordercontroller.list);
router.post('/order/create', Ordercontroller.create);
router.put('/order/update/:id', Ordercontroller.update);
router.get('/order/get/:id', Ordercontroller.get);
router.delete('/order/delete/:id', Ordercontroller.delete);

//importing controller

//creating router
//router.get('/index', controller.index);
router.get('/product/list', Productcontroller.list);
router.post('/product/create', Productcontroller.create);
router.put('/product/update/:id', Productcontroller.update);
router.get('/product/get/:id', Productcontroller.get);
router.delete('/product/delete/:id', Productcontroller.delete);


//export router
module.exports = router;