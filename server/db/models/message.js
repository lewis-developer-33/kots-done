const {DataTypes} = require('sequelize')
const {sequelize} = require('../connect')

const Message = sequelize.define("Message",{
  message:{
    type:DataTypes.STRING
  }
})

module.exports = Message