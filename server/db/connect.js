const {Sequelize} = require('sequelize')
require("dotenv").config()

const DB_NAME=process.env.DB_NAME
const DB_USER=process.env.DB_USER
const DB_PASS=process.env.DB_PASSWORD

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASS,{
    host:'localhost',
    dialect:'mysql'
})

const testAuthentication = async () => {
    try {
        await sequelize.authenticate()
        console.log("Authentication successful")
    } catch (error) {
        console.log("Authentication failed",error)
    }
}


  testAuthentication()
  
// Authentication successful

module.exports = {
    sequelize
}