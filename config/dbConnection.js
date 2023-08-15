const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("db connected successfully: " , connect.connection.name , connect.connection.host);
    }
    catch (err) {
        console.log(err);

        //means that stop entire node js / application as without db app would not function as expected
        process.exit(1);
    }
};

module.exports = connectdb;