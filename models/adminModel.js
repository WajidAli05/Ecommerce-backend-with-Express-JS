// const mongoose = require("mongoose");

// const adminSchema = mongoose.Schema( {
//     name : {
//         type : String , 
//         required : [true , "Name of admin is required!"] , 
//     } , 
//     email : {
//         type : String , 
//         required : [true , "Email is required!"] , 
//         unique : [true , "Email already used!"]
//     } , 
//     password : {
//         type : String , 
//         required : [true , "You can not leave password blank!"] , 
//         trim : true
//     } , 
//     phone : {
//         type : String , 
//         trim : true , 
//         unique : [true , "This phone number is already in use of another admin!"] , 
//         required : [true , "Phone number is requied!"]
//     } , 
//     // picture : {

//     // } , 
//     // lastLogin : {
        
//     // } , 
//     createdAt : {
//         type : Date ,
//         default : Date.now()
//     } , 

//     usersSupervised : [ {
//         type : mongoose.Types.ObjectId , 
//         ref : "Users"
//     }]
// } , 
// {
//     Timestampes : true
// });

// module.exports = mongoose.model("Admin" , adminSchema);