const express = require('express');
const router = express.Router();

const {
    getCart ,
    addToCart , 
    updateCart , 
    removeFromCart ,
    clearCart
} = require("../controllers/cartController");

router.get('/' , getCart);

router.post('/addToCart' , addToCart);

router.delete('/clearCart' , clearCart);

router.route('/:id').put(updateCart).delete(removeFromCart);

module.exports = router;