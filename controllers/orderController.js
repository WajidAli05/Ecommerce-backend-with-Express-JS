//this is to get rid of writing try-catch blocks inside every function. It catches exception and pass it to the
//custom errorHandler middleware.
const asyncHandler = require("express-async-handler");
const Order = require("../models/ordersModel");
const CancelledOrder = require("../models/cancelledOrdersModel");
const errorCodes = require("../constants");
const User = require("../models/userModel");
const CancelledOrders = require("../models/cancelledOrdersModel");

//admin can get all the orders and user can check only their orders
const getOrders = asyncHandler ( async(req , res) => {

    //first check if a user with req.user.id exists or not
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(errorCodes.NOT_FOUND);
        throw new Error("No such user exists!");
    }

    let orders ;
    //if user role is "admin" then return all the orders
    if(user.role == "admin"){
        console.log("inside admin")
        orders = await Order.find({});
    }

    //if user role is "user" then return orders of that user
    if(user.role == "user"){ //&& user.id == Order.user_id.toString()
        console.log("inside user")
        orders = await Order.find({user_id : req.user.id});
    }

    //order is not found 
    if(!orders) {
        console.log("inside else")
        res.status(errorCodes.NOT_FOUND);
        throw new Error("No orders found!");
    }

    //send the found orders
    res.status(errorCodes.OK).json({ orders });
    console.log(orders);
});



//admin can get all the orders and user can check only their orders
const getCancelledOrders = asyncHandler ( async(req , res) => {
     //first check if a user with req.user.id exists or not
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(errorCodes.NOT_FOUND);
        throw new Error("No such user exists!");
    }

    let cancelledoOrders ;
    //if user role is "admin" then return all the orders
    if(user.role == "admin"){
        console.log("inside admin")
        cancelledoOrders = await CancelledOrder.find({});
    }

    //if user role is "user" then return orders of that user
    if(user.role == "user"){ //&& user.id == Order.user_id.toString()
        console.log("inside user")
        cancelledoOrders = await CancelledOrder.find({user_id : req.user.id});
    }

    //order is not found 
    if(!cancelledoOrders) {
        console.log("inside else")
        res.status(errorCodes.NOT_FOUND);
        throw new Error("No orders found!");
    }

    //send the found orders
    res.status(errorCodes.OK).json({ cancelledoOrders });
    console.log(cancelledoOrders);
});



//admin can get all the order and user can check only their order only
const getOrder = asyncHandler ( async(req , res) => {
     //first check if a user with req.user.id exists or not
     const user = await User.findById(req.user.id);
     if(!user){
         res.status(errorCodes.NOT_FOUND);
         throw new Error("No such user exists!");
     }
     let orders ;
     //if user role is "admin" then return the order
     if(user.role == "admin"){
         console.log("inside admin")
         orders = await Order.find({_id : req.params.id});
     }
 
     //if user role is "user" then return orders of that user
     if(user.role == "user"){ //&& user.id == Order.user_id.toString()
         console.log("inside user")
         //user_id : req.user.id => ensures that user gets only the order that he/she has created
         orders = await Order.find({user_id : user.id , _id : req.params.id});
     }
 
     //order is not found 
     if(!orders) {
         console.log("inside else")
         res.status(errorCodes.NOT_FOUND);
         throw new Error("No orders found!");
     }
 
     //send the found orders
     res.status(errorCodes.OK).json({ orders });
     console.log(orders);
});



const updateOrder = asyncHandler ( async(req , res) => {
    //first check if the user who is request this route is a registered user or not
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(errorCodes.NOT_FOUND);
        throw new Error("User not found!");
    }
    
    //check if the order actually exists in the database
    const order = await Order.findById(req.params.id);
    if(!order) {
        res.status(errorCodes.NOT_FOUND);
        throw new Error("Order not found!");
    }

    //if role admin then update the order
    let updatedOrder;
    if(user.role == "admin"){
        updatedOrder = await Order.findByIdAndUpdate(
            order , 
            req.body , 
            {new : true}
        )
    }

    //if role is user then check the user_id associated with the order as well.
    //This ensures that a user can only update his/her orders not of others
    if(user.role == "user" && order.user_id == user._id){
        updatedOrder = await Order.findByIdAndUpdate(
            order , 
            req.body , 
            {new : true}
        )
    }
    
    res.status(errorCodes.OK).json({ updatedOrder });
    console.log(updatedOrder);
});



const createOrder = asyncHandler( async (req , res) => {    
    const loginUser = req.user;
    //checking for any empty fields
    const {orderId , orderDate , shippingAddress , price} = req.body;
    if(!orderId || ! shippingAddress || !price){
        res.status(400);
        throw new Error("All fields are mandatory while placing a new order!");
    }

    //if order with this id already exists
    const existingOrder = await Order.findOne({orderId});
//if already exists then throw an error
    if(existingOrder){
        res.status(400);
        throw new Error({message : "Order id already exists!"});
    };

    const order = await Order.create({
        loginUser ,
        orderId , 
        orderDate , 
        shippingAddress ,
        price
    });

    //if order is successfully created then return the order
    if(!order) {
        res.status(400);
        throw new Error("Creating order unsuccessful!")
    }

    res.status(201);
    res.json({order});
    console.log(req.body);
});



const cancelOrder = asyncHandler( async (req , res) => {
    //first check if user is in database or not
    const isUser = await User.findById(req.user.id);
    if(!isUser) {
        res.status(errorCodes.NOT_FOUND);
        throw new Error("User not found!");
    }

    //check if the order is in the database or not
    const order = await Order.findById(req.params.id);
    if(!order) {
        res.status(400);
        throw new Error("You have not placed this order!")
    }

    let cancelledOrder ;
    if(isUser.role == "admin"){
            //set status of the order to "cancelled" from "confirmed"
            order.status = "cancelled";

            //save the changes to the db
            cancelledOrder = await order.save();
            if(!cancelledOrder) {
                res.status(204);
                throw new Error("Updating order was unsuccessful!");
        }
    }

    if(isUser.role == "user" && order.user_id.toString() == isUser._id){
         //set status of the order to "cancelled" from "confirmed"
         order.status = "cancelled";

         //save the changes to the db
         cancelledOrder = await order.save();
         if(!cancelledOrder) {
             res.status(204);
             throw new Error("Updating order was unsuccessful!");
     }
    }
    

    //save the cancelled order to the cancelledOrders collection
    const newCancelledOrder = await CancelledOrder.create({ 
        cancelledOrder
    });

    //then delete the document with status cancelled order from the newOrders collection
    const removedOrder = await Order.findByIdAndRemove(order);
    if(!removedOrder) {
        res.status(400);
        throw new Error("Deleting order from newOrders Collection was unsuccessful!");
    }
    res.status(200).json({ cancelledOrder });
    console.log(cancelledOrder.price);
});



module.exports = {
    getOrders ,
    getOrder , 
    updateOrder , 
    createOrder ,
    cancelOrder ,
    getCancelledOrders
}