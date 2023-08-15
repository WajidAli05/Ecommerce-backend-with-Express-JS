const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "newUser" , 
        required : true
    } , 
    orderId:{
        type: String , 
        required: [true , "Order Id is required!"] , 
        unique: [true , "One order with this id already exists!"]
    } , 
    
    orderDate : {
        type : Date , 
        default : Date.now(),
    } , 
    shippingAddress : {
        type : String , 
        required : [true , "Shipping address is required for order fulfillment!"]
    } , 
    price : {
        type : Number , 
        required : [true , "Price can not be empty!"] , 
        default : 0
    } , 
    status : {
        type: String,
        enum: ["confirmed", "cancelled"], //"pending", "delivered", to be added 
        default: "confirmed" 
    }
} , 
{
    Timestamps : true
});

module.exports = mongoose.model("newOrders" , ordersSchema);