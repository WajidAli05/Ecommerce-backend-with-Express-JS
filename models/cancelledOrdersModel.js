const mongoose = require("mongoose");

const cancelledOrdersSchema = mongoose.Schema( {
    user_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "newUser" , 
        required : true
    } ,
    cancelledOrders : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "newOrders"
    }
} , 
{
    timestamps : true
});

module.exports = mongoose.model("cancelleOrders" , cancelledOrdersSchema);