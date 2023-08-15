const asyncHandler = require("express-async-handler");

const viewUsers = asyncHandler ( async(req , res) => {

    res.status(200).json({ message: "View all users"} );
});

const viewUserProfile = asyncHandler( async (req , res) => {
    res.status(200).json({ message: "View a specific user profile"});
});

const approveUser = asyncHandler( async (req , res) => {
    res.status(200).json({ kmessage: "Approve a user"});
});

const deleteUser = asyncHandler ( async(req , res) => {
    res.status(200).json({ message: "Delete a user"});
});

const viewProducts = asyncHandler( async (req , res) => {
    res.status(200).json({ message: "view all the products"});
});

const viewProduct = asyncHandler( async(req , res)=> {
    res.status(200).json({ message: "View a product"});
});

const approveProduct = asyncHandler( async (req , res) => {
    res.status(200).json({ message: "Approve a product"});
});

const deleteProduct = asyncHandler( async(req , res) => {
    res.status(200).json({ message: "Delete a product"});
});

const viewOrders = asyncHandler( async(req , res) => {
    res.status(200).json({ message: "View order history"});
});

const changePassword = asyncHandler(async (req , res) => {
    res.status(200).json({message: "Change password"});
});


module.exports = {
    viewUsers , 
    viewUserProfile ,
    approveUser ,
    deleteUser ,
    viewProducts , 
    viewProduct ,
    approveProduct , 
    deleteProduct , 
    viewOrders ,
    changePassword
}