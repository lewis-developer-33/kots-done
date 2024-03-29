const {DataTypes} = require('sequelize')
const {sequelize} = require('../connect')

const School = sequelize.define("School",{
  title:{
    type:DataTypes.STRING
  }
})

module.exports = School