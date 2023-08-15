const asyncHandler = require("express-async-handler");

const getCart = asyncHandler(async (req , res) => {
    res.status(200).json({ message: "Get a user cart"});
});

const addToCart =asyncHandler(async (req , res) => {
    res.status(200).json({ message: "Add to cart"});
});

const updateCart = asyncHandler(async (req , res) => {
    res.status(200).json({ message: "Update the cart"});
});

const clearCart =asyncHandler(async (req , res) => {
    res.status(200).json({ message: "Clear the cart"});
});

const removeFromCart = asyncHandler(async(req , res) => {
    res.status(200).json({ message: "Remove from cart"});
});

module.exports = {
    getCart ,
    addToCart , 
    updateCart , 
    removeFromCart ,
    clearCart
}