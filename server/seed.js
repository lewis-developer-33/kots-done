const User = require("./db/models/user")
const Notice = require("./db/models/notice")
const Message = require("./db/models/message")

const College = require('./db/models/college')
const School = require('./db/models/school')
const Department = require('./db/models/department')
const Course = require('./db/models/course')
const Semester = require('./db/models/semester')



College.hasMany(School)
School.hasMany(Department)
Department.hasMany(Course)

Course.hasMany(User)
User.belongsTo(Course)
Semester.hasMany(User)
User.belongsTo(Semester)

User.hasMany(Notice,{
    foreignKey:"Author"
})
Notice.belongsTo(User)


User.hasMany(Message,{
    foreignKey:"Author"
})
Message.belongsTo(User)


Notice.hasMany(Message,{
    foreignKey:"Subject"
})
Message.belongsTo(Notice)

Course.hasMany(Notice)
Notice.belongsTo(Course)

School.hasMany(Notice)
Notice.belongsTo(School)

College.hasMany(Notice)
Notice.belongsTo(College)

Semester.hasMany(Notice)
Notice.belongsTo(Semester)


const createColleges = async () => {
    try {
        await College.create({
            title:"COPAS"
        })
        console.log("Created college")
    } catch (error) {
        console.log(error.message)
    }
}

const createSchools = async () => {
    try {
        await School.create({
            title:"SCIT",
            CollegeId:1
        })
        console.log("Created college")
    } catch (error) {
        console.log(error.message)
    }
}

const createDepartments = async () => {
    try {
        await Department.create({
            title:"IT",
            SchoolId:1
        })
        console.log("Created college")
    } catch (error) {
        console.log(error.message)
    }
}

const createCourses = async () => {
    try {
        await Course.create({
            title:"BIT",
            DepartmentId:1
        })
        console.log("Created college")
    } catch (error) {
        console.log(error.message)
    }
}

const createSemesters = async () => {
    try {
        await Semester.bulkCreate([
            {
                title:"1.1",
            },
            {
                title:"1.2",
            },
            {
                title:"2.1",
            },
            {
                title:"2.2",
            },
            {
                title:"4.1",
            },
        ])
        console.log("Created college")
    } catch (error) {
        console.log(error.message)
    }
}

createSemesters()


