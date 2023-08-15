const express = require("express");
const router = express.Router();
const {
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
} = require('../controllers/adminController');


router.get('/viewUsers' , viewUsers);

router.get('/viewProducts' , viewProducts);

router.get('/viewOrders' , viewOrders);

router.put('/changePassword' , changePassword);

router.get('/:id/userProfile' , viewUserProfile);

router.post('/:id/approveUser' , approveUser);

router.delete('/:id/user' , deleteUser);

router.get('/:id/product' , viewProduct);

router.post('/:id/approveProduct' , approveProduct);

router.delete('/:id/product' , deleteProduct);

module.exports = router;