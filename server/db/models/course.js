const {DataTypes} = require('sequelize')
const {sequelize} = require('../connect')

const Course = sequelize.define("Course",{
  title:{
    type:DataTypes.STRING
  }
})

module.exports = Course