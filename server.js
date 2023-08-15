const express = require("express");
const env = require("dotenv").config();
const productsRouter = require("./routes/productRoutes");
const usersRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartsRoutes");
const orderRouter = require("./routes/orderRoutes");
const adminRouter = require("./routes/adminRoutes");
const errorHandler = require("./middlewares/errorHandler");
const connectdb = require("./config/dbConnection");

//connect to db first
connectdb();
const app = express();

const port = process.env.PORT || 5000;

//body parser
app.use(express.json());

//custom error handling middleware
app.use(errorHandler);
//products middleware
app.use('/products' , productsRouter);

//users middleware
app.use('/users' , usersRouter);

//cart middleware
app.use('/cart' , cartRouter);

//order middleware
app.use("/orders" , orderRouter);

//admin middleware
app.use('/admin' , adminRouter);
app.listen(port , () => {
    console.log(`Server listening on port ${port}`);
})