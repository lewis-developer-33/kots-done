const User = require("../db/models/user")
const College = require("../db/models/college")
const School = require("../db/models/school")

College.hasMany(School)
School.belongsTo(College)

const createCollege = async (req,res) => {
    const {name,code} = req.body
    if (!name || !code) res.json({message:"All fields are required"})
    try {
        const newCollege = {
            name,
            code
        }
        const college = await College.create(newCollege)
        res.json({message:"College created successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const deleteCollege = async (req,res) => {
    const {code} =req.body
    try {
        await College.destroy({where:{code:code}})
        res.json({message:"College destroyed successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const getColleges = async (req,res) => {
    try {
        const colleges = await College.findAll({include:School})
        res.json({message:colleges})
    } catch (error) {
        console.log(error.message)
    }
}

const getCollege = async (req,res) => {
    const {email} = req.body
    try {
        const college = await College.findOne({where:{code},include:School})
        res.json({message:college})
    } catch (error) {
        console.log(error.message)
    }
}

const updateCollege = async (req,res) => {
    const {code,name} =req.body
    try {
        const collegeFound = await College.findOne({where:{code}})
        if(collegeFound == null) res.json({message:"No such college"})
        const updatedCollege = {
            name:name ? name : collegeFound.name,
            code:code ? code : collegeFound.code
        }
        await College.update(updatedCollege,{
            where:{
                email:email
            }
        })

        res.json({message:"College updated successfully"})
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    createCollege,
    deleteCollege,
    getColleges,
    getCollege,
    updateCollege
}