const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const port = 8000
const app = express()

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


app.use(express.json())
app.use(cors())
app.use(errorHandler)
app.use(express.urlencoded({ extended: true }));

app.listen(port,() => {
    console.log(`Server running on ${port}`)
})


// Authentication
app.post("/sign-up",async(req,res) => {
    try {
        const {name,email,role,pass} = req.body
        await User.create({
            name,
            email,
            password:pass,
            role
        })
        const userFound = await User.findOne({where:{email}})
        res.json({message:userFound})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.post("/login",async(req,res) => {
    try {
        const {email,pass} = req.body
        const userFound = await User.findOne({where:{email}})
        if (userFound.password == pass) res.json({message:userFound})
        else res.json({error:"Wrong details"})
        
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})


app.get('/courses',async(req,res) => {
    try {
        const courses = await Course.findAll()
        res.json({message:courses})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.get('/sem',async(req,res) => {
    try {
        const courses = await Semester.findAll()
        res.json({message:courses})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.get('/college',async(req,res) => {
    try {
        const courses = await College.findAll()
        res.json({message:courses})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})
app.get('/school',async(req,res) => {
    try {
        const courses = await School.findAll()
        res.json({message:courses})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

// Notice
app.get('/notice/:id',async(req,res) => {
    try {
        const {id}  = req.params
        const userFound = User.findOne({where:{id}})

        const {role} = userFound
        if (role == "student"){
            const notices = Notice.findAll({include:[
                {
                    model:'Semester',
                    required:true,
                },
                {
                    model:'Course',
                    required:true
                },
                {
                    model:'School',
                    required:true
                },
                {
                    model:'College',
                    required:true
                },
                {
                    model:'Author',
                    required:true
                },
            ]})
            res.json({message:notices})
        }
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.post('/notice/:id',async(req,res) => {
    try {
        const {title,message,file,course,sem,school,college} = req.body
        const {id}  = req.params
        const userFound = await User.findOne({where:{id}})
        // console.log(userFound)
        if (userFound.role == 'Class Rep'){

            await Notice.create({
                title,
                message,
                file,
                CourseId:userFound.CourseId,
                SemesterId:userFound.SemesterId,
                Author:userFound
            })
            res.json({message:"Notice posted by class rep"})
        }
        else if (userFound.role == 'Lecturer'){
            console.log("lec doing stuff")
            const courseFound = await Course.findOne({where:{title:course}})
            console.log(courseFound)
            const semesterFound = await Semester.findOne({where:{title:sem}})
            console.log(semesterFound)
            await Notice.create({
                title,
                message,
                file,
                CourseId:courseFound.id,
                SemesterId:semesterFound.id,
                Author:userFound.id
            })
            res.json({message:"Notice posted by class lecturer"})
        }
        else if (userFound.role == 'Admin'){
            const courseFound = await Course.findOne({where:{title:course}})
            const semesterFound = await Semester.findOne({where:{title:sem}})
            const schoolFound = await Semester.findOne({where:{title:school}})
            const collegeFound = await Semester.findOne({where:{title:college}})
            await Notice.create({
                title,
                message,
                file,
                CourseId:courseFound,
                SemesterId:semesterFound,
                schoolFoundId:schoolFound,
                collegeFoundId:collegeFound,
                Author:userFound
            })
            res.json({message:"Notice posted by class admin"})
        }
        else {
            res.json({error:"You lack authorization"})
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.put('/notice/:id',async(req,res) => {
    try {
        const {title,message,file,course,sem,school,college,notice} = req.body
        const {id}  = req.params

        const userFound = User.findOne({where:{id}})
        const noticeFound = Notice.findOne({where:{title:notice}})

        if (noticeFound.Author != userFound){
            res.json({error:"Not authorized"})
        }
        else {
            const courseFound = await Course.findOne({where:{title:course}})
            const semesterFound = await Semester.findOne({where:{title:sem}})
            const schoolFound = await School.findOne({where:{title:school}})
            const collegeFound = await College.findOne({where:{title:college}})

            const newNotice = {
                title: title == null ? noticeFound.title : title,
                message: title == null ? noticeFound.title : message,
                file: title == null ? noticeFound.title : file,
                CourseId: courseFound == null ? noticeFound.courseFound : courseFound,
                SemesterId: semesterFound == null ? noticeFound.semesterFound : semesterFound,
                SchoolId: schoolFound == null ? noticeFound.schoolFound : schoolFound,
                CollegeId: collegeFound == null ? noticeFound.collegeFound : collegeFound,
            }
            await Notice.update(newNotice, {
                where: {
                  title
                }
              });
            res.json({message:"Successful update"})
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.delete('/hospital/:id',async(req,res) => {
    try {
        const {title} = req.body
        const {id}  = req.params

        const userFound = User.findOne({where:{id}})
        const noticeFound = Notice.findOne({where:{title:notice}})

        if (noticeFound.Author != userFound){
            res.json({error:"Not authorized"})
        }
        else {
            await Notice.destroy({
                where: {
                  title
                }
              });
            res.json({message:"Notice destroyed"})
        }
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.post('/message/:id',async(req,res) => {
    try {
        const {id} = req.params
        const {message} = req.body
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.get('/notices/:id',async(req,res) => {
    try {
        console.log("hi")
        const {id} = req.params
        const notices = await Notice.findAll({
            where:{Author:id},
            include:{
                model:User
        }})
        console.log(notices)
        res.json({message:notices})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})
