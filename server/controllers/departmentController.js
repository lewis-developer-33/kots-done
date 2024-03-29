const School = require("../db/models/school")
const Department = require("../db/models/department")
const Course = require("../db/models/course")

Department.hasMany(Course)
Course.belongsTo(Department)

School.hasMany(Department)
Department.belongsTo(School)

const createDepartment = async (req,res) => {
    const {name,code,school} = req.body
    if (!name || !code) res.json({message:"All fields are required"})
    try {
        const newDepartment = {
            name,
            code,
            SchoolId:school
        }
        const department = await Department.create(newDepartment)
        res.json({message:"Department created successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const deleteDepartment = async (req,res) => {
    const {code} =req.body
    try {
        await Department.destroy({where:{code:code}})
        res.json({message:"Department destroyed successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const getDepartments = async (req,res) => {
    try {
        const departments = await Department.findAll({include:Course})
        res.json({message:departments})
    } catch (error) {
        console.log(error.message)
    }
}

const getDepartment = async (req,res) => {
    const {code} = req.body
    try {
        const department = await Department.findOne({where:{code},include:Course})
        res.json({message:department})
    } catch (error) {
        console.log(error.message)
    }
}

const updateDepartment = async (req,res) => {
    const {code,name} =req.body
    try {
        const departmentFound = await Department.findOne({where:{code}})
        if(departmentFound == null) res.json({message:"No such department"})
        const updatedDepartment = {
            name:name ? name : departmentFound.name,
            code:code ? code : departmentFound.code
        }
        await Department.update(updatedDepartment,{
            where:{
                email:email
            }
        })

        res.json({message:"Department updated successfully"})
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    createDepartment,
    deleteDepartment,
    getDepartments,
    getDepartment,
    updateDepartment
}