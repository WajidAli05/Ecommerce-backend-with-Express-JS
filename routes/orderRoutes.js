const express = require('express');
const router = express.Router();

const {
    getOrders ,
    getOrder , 
    updateOrder , 
    createOrder ,
    cancelOrder , 
    getCancelledOrders
} = require("../controllers/orderController");
const validateToken = require('../middlewares/acessTokenHandler');

//All the routes below are protected and user needs to login to access them
router.use(validateToken);

router.get('/' , getOrders);

router.get('/cancelledOrders' , getCancelledOrders);

router.post('/createOrder' , createOrder);

router.put('/:id/cancelOrder' , cancelOrder);   

router.route('/:id').get(getOrder).put(updateOrder);

module.exports = router;