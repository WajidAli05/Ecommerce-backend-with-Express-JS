const express = require("express");
const router = express.Router();
const {
    getProducts , 
    getProduct , 
    updateProduct , 
    deleteProduct , 
    addProduct
} = require("../controllers/productController");
const validateToken  = require("../middlewares/acessTokenHandler");

router.use(validateToken);
//route for getting all the products
router.get('/' , getProducts);

//route for adding a new product
router.post('/addProduct' , addProduct);

//routes chaining for getting, updating, and deleting a single product
router.route('/:id').put(updateProduct)
.delete(deleteProduct);

router.post("/findProduct" , getProduct);

module.exports = router;