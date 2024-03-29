const User = require("../db/models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()

//@desc Register user
//@route Get /api/register
//@access pubic
const registerUser = async (req,res) => {
    const {name,email,phone,password} = req.body
    if (!name || !email || !phone || !password){
        res.status(400).json({message:"All fields are required"})
    }
    const userFound = await User.findOne({where:{email:email}})
    if (userFound) res.status(400).json({message:"User already registered"})
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const user = await User.create({
        name,
        email,
        phone,
        password:hashedPassword
    })

    if (user) res.status(201).json({id:user.id,email:user.email,name:user.name})
    else res.status(400).json({message:"User data not valid"})
}

//@desc Log In user
//@route Get /api/login
//@access pubic
const logInUser = async (req,res) => {
    const {email,password} = req.body
    if (!email || !password) res.status(400).json({message:"All fields are required"})
    const userFound = await User.findOne({where:{email:email}})
    if (userFound && (await bcrypt.compare(password,userFound.password))){
        const accessToken = jwt.sign({
          user:{
            name:userFound.name,
            email:userFound.email,
            id:userFound.id
          },  
        },process.env.ACCESS_TOKEN,{expiresIn:"2h"})
        res.status(200).json({accessToken})
    }
    else res.status(400).json({message:"Log in user"})
}

//@desc Current user
//@route Get /api/current
//@access private
const currentUser = (req,res) => {
    console.log(req?.res?.locals?.decoded?.user)
    res.status(200).json({message:"Current user"})
}

module.exports = {
    registerUser,
    logInUser,
    currentUser
}