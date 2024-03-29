const User = require("../db/models/user")
const Notification = require("../db/models/notification")


User.hasMany(Notification)
Notification.belongsTo(User)

const createNotification = async (req,res) => {
    const {message,file} = req.body
    if (!message) res.json({message:"All fields are required"})
    try {
        const newNotification = {
            message,
            file
        }
        const notification = await Notification.create(newNotification)
        res.json({message:"Notification created successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const deleteNotification = async (req,res) => {
    const {id} =req.body
    try {
        await Notification.destroy({where:{id}})
        res.json({message:"Notification destroyed successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const getNotifications = async (req,res) => {
    try {
        const notifications = await Notification.findAll({include:User})
        res.json({message:notifications})
    } catch (error) {
        console.log(error.message)
    }
}

const getNotification = async (req,res) => {
    const {id} = req.body
    try {
        const notification = await Notification.findOne({where:{id},include:User})
        res.json({message:notification})
    } catch (error) {
        console.log(error.message)
    }
}

const updateNotification = async (req,res) => {
    const {id,file,name} =req.body
    try {
        const notificationFound = await Notification.findOne({where:{id}})
        if(notificationFound == null) res.json({message:"No such notification"})
        const updatedNotification = {
            name:name ? name : notificationFound.name,
            file:file ? file : notificationFound.file
        }
        await Notification.update(updatedNotification,{
            where:{
                email:email
            }
        })

        res.json({message:"Notification updated successfully"})
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    createNotification,
    deleteNotification,
    getNotifications,
    getNotification,
    updateNotification
}