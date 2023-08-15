const asyncHandler = require("express-async-handler");
const errorCodes = require("../constants");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");


const getUsers = asyncHandler(async(req , res) => {
    if(req.user.role !== "admin"){
        res.status(errorCodes.FORBIDDEN);
        throw new Error("You are not an admin!");
    }

    const users = await User.find();

    if(!users) {
        res.status(errorCodes.NOT_FOUND);
        throw new Error("Users could not be fetched!");
    }

    res.status(errorCodes.OK).json(users);
    console.log(users);
});

//register user
const registerUser = asyncHandler(async(req , res) => {
    const {firstName , lastName , email , password , phone , address , role} = req.body;

    //none of the fields should be empty
    if(!firstName || !lastName || !email || !password || !phone || !address) {
        res.status(errorCodes.VALIDATION_ERROR);
        throw new Error("One or more fields are empty!");
    }

    //check a user by id and by email
    const existingUser = await User.findById(req.params.id);
    const existingPhone = await User.findOne({email});

    if(existingPhone || existingUser) {
        res.status(errorCodes.ALREADY_EXISTS);
        throw new Error("User already registered!");
    }

    //hashing the plaintext password
    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser = await User.create( {
        firstName , 
        lastName , 
        email , 
        password : hashedPassword , 
        phone , 
        address ,
        role
    });

    if(!newUser) {
        res.status(errorCodes.SERVER_ERROR);
        throw new Error("Creating user was unsuccessful! Try again!");
    }

    res.status(errorCodes.RESOURCE_CREATED).json({ _id : newUser.id , 
        firstName : newUser.firstName , 
        lastName : newUser.lastName , 
        email: newUser.email , 
        password : newUser.hashedPassword ,  
        phone : newUser.phone , 
        address : newUser.address , 
    role : newUser.role} );
    console.log(newUser);
});


//for user login
const loginUser = asyncHandler(async (req , res) => {
    const {email , password} = req.body;
    
    if(!email || !password) {
        res.status(errorCodes.VALIDATION_ERROR);
        throw new Error("Email or password is empty!");
    }

    const user = await User.findOne({email});

    if(!user) {
        res.status(errorCodes.NOT_FOUND);
        throw new Error("User not registered with us!");
    }

    const comparedPasword = await bcrypt.compare(password , user.password);
    if(!comparedPasword) {
        res.status(errorCodes.VALIDATION_ERROR);
        throw new Error("Incorrect password!");
    }

    const accessToken = jwt.sign( {
        user : {
            userName : user.firstName.concat(" " , user.lastName) , 
            email : user.email , 
            id : user.id
        } , 
    } , 
    process.env.ACCESS_TOKEN_SECRET , 
    {expiresIn : "5m"});

    res.status(errorCodes.OK).json( accessToken );
    console.log(accessToken);
});

const getProfile =asyncHandler(async (req , res) => {
    res.status(errorCodes.OK).json(req.user);
});

const updateProfile = asyncHandler(async(req , res)=> {
    //first check if the req.body is empty or not
    const {firstName , lastName , email , password , phone , address} = req.body;

    //none of the fields should be empty
    if(!firstName || !lastName || !email || !password || !phone || !address) {
        res.status(errorCodes.VALIDATION_ERROR);
        throw new Error("One or more fields are empty!");
    }

    //if req.body is not emprt then find the user by id
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(errorCodes.VALIDATION_ERROR);
        throw new Error("Could not find the user!");
    }

    //if a user exist against that id then compare the ids
    // if(user._id.toString() !== req.user.id) {
    //     res.status(errorCodes.FORBIDDEN);
    //     throw new Error("Access forbidden!");
    // }

    //if ids are the same then update the user profile
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id , 
        req.body , 
        {new : true}
    )

    if(!updatedUser) {
        res.status(errorCodes.SERVER_ERROR);
        throw new Error("Profile could not be updated! Try again!");
    }
    res.status(errorCodes.OK).json({ updatedUser});
    console.log(updatedUser);
});

// const changePassword = asyncHandler(async(req , res) => {
//     res.status(200).json({message: "Change password"});
// });


module.exports = {
    registerUser , 
    loginUser ,
    getProfile ,
    updateProfile ,
    getUsers
}