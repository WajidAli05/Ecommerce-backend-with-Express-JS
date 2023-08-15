const mongoose = require("mongoose");

const userSchema = mongoose.Schema( {
    firstName : {
        type : String , 
        required : [true , "First name is required!"] , 
        trim : true , 
        maxLength : 15 , 
        minLength : 3 ,
    } , 

    lastName : {
        type : String , 
        required : [true , "Last name is required!"] , 
        trim : true , 
        maxLength : 15 , 
        minLength : 3 ,
    } ,

    email : {
        type : String ,
        required : [true , "Email is required!"] , 
        trim : true ,
        minLength : [10 , "Short than minumum length of 10 characters!"]
    } , 

    password: {
        type : String , 
        required : [true , "Password can not be empty!"] ,
        trim : true , 
        minLength : [5 , "Password can not be shorter than 5 characters!"]
    } , 

    phone : {
        type : String , 
        required : [true , "Phone is required!"] ,
        trim : true , 
    } , 

    address : {
        type : String , 
        trim : true , 
    } , 

    role : {
        type : String , 
        enum : ["user" , "admin"] , 
        default : "user"
    } ,

    // profilePic : {
    //     type : Buffer , 
    // } , 

    cart : [ {
        type :mongoose.Schema.Types.ObjectId , 
        ref : "cart"
    }] , 

    orders : [ {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "newOrders"
    }] , 

    wishList : [ {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Products"
    }] , 

    createdAt : {
        type : Date ,
        default : Date.now
    }

    // lastLogin : {
        
    // } ,


} , 
{
    Timestamps : true
});

module.exports = mongoose.model("Users" , userSchema);