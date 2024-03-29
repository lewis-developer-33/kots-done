const College = require("../db/models/college")
const School = require("../db/models/school")
const Department = require("../db/models/department")

School.hasMany(Department)
Department.belongsTo(School)

College.hasMany(School)
School.belongsTo(College)

const createSchool = async (req,res) => {
    const {name,code,college} = req.body
    if (!name || !code) res.json({message:"All fields are required"})
    try {
        const newSchool = {
            name,
            code,
            CollegeId:college
        }
        const school = await School.create(newSchool)
        res.json({message:"School created successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const deleteSchool = async (req,res) => {
    const {code} =req.body
    try {
        await School.destroy({where:{code:code}})
        res.json({message:"School destroyed successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const getSchools = async (req,res) => {
    try {
        const schools = await School.findAll({include:Department})
        res.json({message:schools})
    } catch (error) {
        console.log(error.message)
    }
}

const getSchool = async (req,res) => {
    const {email} = req.body
    try {
        const school = await School.findOne({where:{code},include:Department})
        res.json({message:school})
    } catch (error) {
        console.log(error.message)
    }
}

const updateSchool = async (req,res) => {
    const {code,name} =req.body
    try {
        const schoolFound = await School.findOne({where:{code}})
        if(schoolFound == null) res.json({message:"No such school"})
        const updatedSchool = {
            name:name ? name : schoolFound.name,
            code:code ? code : schoolFound.code
        }
        await School.update(updatedSchool,{
            where:{
                email:email
            }
        })

        res.json({message:"School updated successfully"})
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    createSchool,
    deleteSchool,
    getSchools,
    getSchool,
    updateSchool
}