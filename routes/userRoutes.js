const express = require('express');
const router = express.Router();
const {
    registerUser , 
    loginUser ,
    getProfile ,
    updateProfile , 
    getUsers
            } = require('../controllers/userController');
const validateToken = require("../middlewares/acessTokenHandler");



//register a new user
router.post('/register' , registerUser);

//login a registered user
router.post('/login' , loginUser);

router.use(validateToken);

router.get("/getUsers" , getUsers);
//get a registered user profile
router.get('/getProfile' , getProfile);

//update a registered user profile
router.put('/updateProfile/:id' , updateProfile);

//change password for a registered user
// router.put('/changePassword' ,changePassword);

module.exports = router;