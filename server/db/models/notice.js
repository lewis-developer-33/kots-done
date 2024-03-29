const {DataTypes} = require('sequelize')
const {sequelize} = require('../connect')

const Notice = sequelize.define("Notice",{
  title:{
    type:DataTypes.STRING,
  },  
  message:{
    type:DataTypes.STRING
  },
  file:{
    type:DataTypes.STRING
  }
})

module.exports = Notice