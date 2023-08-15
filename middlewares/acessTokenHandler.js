const asyncHandler = require("express-async-handler");
const  jwt = require("jsonwebtoken");
const errorCodes = require("../constants");

const validateToken = asyncHandler(async (req , res , next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(
            token , 
            process.env.ACCESS_TOKEN_SECRET , 
            (err , decoded) => {
                if(err) {
                    res.status(errorCodes.UNAUTHORIZED);
                    throw new Error("Invalid Token!");
                }

                req.user = decoded.user;
                next();
            }
        )
        if(!token) {
            res.status(errorCodes.UNAUTHORIZED);
            throw new Error("Authorization failed!");
        }
    }
});

module.exports = validateToken;