const asyncHandler = require("express-async-handler");
const Product = require("../models/productsModel");
const errorCodes = require("../constants");
const User = require("../models/userModel");


//get all the products that are added to the system
const getProducts = asyncHandler(async(req , res) => {
    const products = await Product.find({});

    if(!products) {
        res.status(errorCodes.NOT_FOUND) ;
        throw new Error("Products could not found!");
    }

    res.status(errorCodes.OK);
    res.json({ products});
    console.log("All the Products : " , products);
});


//add a new product to the system
const addProduct = asyncHandler(async(req , res) => {
    //check the role of the user. If it is "admin" then allow to add a new product otherwise not
    const isadmin = await User.findById(req.user.id);
    if(!isadmin || isadmin.role == "user"){
        res.status(errorCodes.NOT_FOUND);
        res.json("There is not such admin!");
    }

    const {name , description , price , quantity} = req.body;

    if(!name || !description || !price || !quantity || !user_id) {
        res.status(errorCodes.VALIDATION_ERROR);
        throw new Error("One or more fields are empty!");
    }

    const existingProduct = await Product.findOne( { name } );
    if(existingProduct) {
        res.status(errorCodes.ALREADY_EXISTS);
        throw new Error("Product with the same name already exists!");
    }

    const newProduct = await Product.create ( {
        name , 
        description , 
        price , 
        quantity , 
        user_id : req.user.id ,
        createdAt : Date.now()
    })

    res.status(errorCodes.RESOURCE_CREATED).json({ newProduct});
    console.log("New product added is : " . newProduct);
});


//get a particular product in the system
const getProduct = asyncHandler(async(req , res) => { 
    const {name} = req.body;
    const existingProduct = await Product.findOne({name});

    if(!existingProduct) {
        res.status(errorCodes.NOT_FOUND);
        throw new Error("Finding product was unsuccessful!");
    }

    res.status(errorCodes.OK).json({ existingProduct });  
});


//update a particular product by id
const updateProduct = asyncHandler(async(req , res) => {
    const isadmin = await User.findById(req.user.id);
    if(!isadmin || isadmin.role == "user"){
        res.status(errorCodes.NOT_FOUND);
        res.json("There is not such admin!");
    }

    const existingProduct  = await Product.findById(req.params.id);
    if(!existingProduct) {
        res.status(errorCodes.NOT_FOUND);
        throw new Error("Product search for updating unsuccessful!");
    }

    //user can not leave any field blank
    const {name , description , price , quantity} = req.body;
    if(!name || !description || !price || !quantity) {
        res.status(errorCodes.VALIDATION_ERROR);
        throw new Error("One or more fields are empty!");
    }

    //if there is a product in database with the same name then an error will be thrown
    if(name === existingProduct.name) {
        res.status(errorCodes.ALREADY_EXISTS);
        throw new Error("Product with the same name already exists!");
    }

    //if everything is ok then update the product
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id , 
        req.body , 
        {new : true}
        )

        //in case product updating does not happen
    if(!updatedProduct) {
        res.status(errorCodes.SERVER_ERROR);
        throw new Error("Could not update the product!");
    }    

    //if update is successful then send back the updated product to user
    res.status(errorCodes.OK).json({ updatedProduct });
    console.log(updatedProduct);
});


//delete a product. we will find the product by ids
const deleteProduct = asyncHandler(async(req , res) => {
//first check if the user actually exists in the database or not
    const isadmin = await User.findById(req.user.id);
    if(!isadmin){
        res.status(errorCodes.NOT_FOUND);
        res.json("There is not such admin!");
    }

    //check if the requried order is in the database or not
    const existingProduct = await Product.findById(req.params.id);
    
    if(!existingProduct) {
        res.status(errorCodes.NOT_FOUND);
        throw new Error("Product not found!");
    }

    let deletedProduct ;
    //if the user is an admin
    if(isadmin.role == "admin"){
        deletedProduct = await Product.findByIdAndDelete(req.params.id);
    }

    //if role is user
    if(isadmin.role == "user"){
        deletedProduct = await Product.findAndDelete(req.params.id);
    }

    if(!deletedProduct) {
        res.status(errorCodes.SERVER_ERROR);
        throw new Error("Could not delete the product!");
    }

    res.status(errorCodes.OK).json({ deletedProduct });
});

module.exports = {
    getProducts , 
    getProduct , 
    updateProduct , 
    deleteProduct , 
    addProduct
}