const {DataTypes} = require('sequelize')
const {sequelize} = require('../connect')

const Department = sequelize.define("Department",{
  title:{
    type:DataTypes.STRING
  }
})

module.exports = Department