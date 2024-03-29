const jwt = require("jsonwebtoken")
require("dotenv").config()

const validateToken = async (req,res,next) => {
    // let token
    // let authHeader = req.headers.Authorization || req.headers.authorization
    // if (authHeader && authHeader.startsWith("Bearer")){
    //     token = authHeader.split(" ")[1]
    //     jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded) => {
    //         if (err) res.status(403).json({message:"User's token expired"})
    //         else{
    //             console.log(decoded)
    //             next()
    //         }
    //     })        
    // }
    // else {
    //     res.status(402)
    // }
    
}

module.exports = validateToken