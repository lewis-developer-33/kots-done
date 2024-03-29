const { sequelize } = require( "./connect");

const User = require("./models/user")
const Notice = require("./models/notice")
const Message = require("./models/message")

const College = require('./models/college')
const School = require('./models/school')
const Department = require('./models/department')
const Course = require('./models/course')
const Semester = require('./models/semester')


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

const synchroTables = async () => {
    try {
        await sequelize.sync({alter:true})
        console.log("DB synced")
    } catch (error) {
        console.log("Sync failed",error.message)
    }
}

synchroTables()