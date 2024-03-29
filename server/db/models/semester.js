const {DataTypes} = require('sequelize')
const {sequelize} = require('../connect')

const Semester = sequelize.define("Semester",{
  title:{
    type:DataTypes.STRING
  }
})

module.exports = Semester