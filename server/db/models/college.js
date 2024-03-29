const {DataTypes} = require('sequelize')
const {sequelize} = require('../connect')

const College = sequelize.define("College",{
  title:{
    type:DataTypes.STRING
  }
})

module.exports = College