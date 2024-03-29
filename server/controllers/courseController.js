const User = require("../db/models/user")
const Course = require("../db/models/course")
const Department = require("../db/models/department")

Course.hasMany(User)
User.belongsTo(Course)

Department.hasMany(Course)
Course.belongsTo(Department)

const createCourse = async (req,res) => {
    const {name,code,department} = req.body
    if (!name || !code) res.json({message:"All fields are required"})
    try {
        const newCourse = {
            name,
            code,
            DepartmentId:department
        }
        const course = await Course.create(newCourse)
        res.json({message:"Course created successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const deleteCourse = async (req,res) => {
    const {code} =req.body
    try {
        await Course.destroy({where:{code:code}})
        res.json({message:"Course destroyed successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const getCourses = async (req,res) => {
    try {
        const courses = await Course.findAll({include:User})
        res.json({message:courses})
    } catch (error) {
        console.log(error.message)
    }
}

const getCourse = async (req,res) => {
    const {email} = req.body
    try {
        const course = await Course.findOne({where:{code},include:User})
        res.json({message:course})
    } catch (error) {
        console.log(error.message)
    }
}

const updateCourse = async (req,res) => {
    const {code,name} =req.body
    try {
        const courseFound = await Course.findOne({where:{code}})
        if(courseFound == null) res.json({message:"No such course"})
        const updatedCourse = {
            name:name ? name : courseFound.name,
            code:code ? code : courseFound.code
        }
        await Course.update(updatedCourse,{
            where:{
                email:email
            }
        })

        res.json({message:"Course updated successfully"})
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    createCourse,
    deleteCourse,
    getCourses,
    getCourse,
    updateCourse
}