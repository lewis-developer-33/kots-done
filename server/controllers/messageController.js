const User = require("../db/models/user")
const Message = require("../db/models/message")


User.hasMany(Message)
Message.belongsTo(User)

const createMessage = async (req,res) => {
    const {message,file} = req.body
    if (!message) res.json({message:"All fields are required"})
    try {
        const newMessage = {
            message,
            file
        }
        const message = await Message.create(newMessage)
        res.json({message:"Message created successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const deleteMessage = async (req,res) => {
    const {id} =req.body
    try {
        await Message.destroy({where:{id}})
        res.json({message:"Message destroyed successfully"})
    } catch (error) {
        console.log(error.message)
    }
}

const getMessages = async (req,res) => {
    try {
        const messages = await Message.findAll({include:User})
        res.json({message:messages})
    } catch (error) {
        console.log(error.message)
    }
}

const getMessage = async (req,res) => {
    const {id} = req.body
    try {
        const message = await Message.findOne({where:{id},include:User})
        res.json({message:message})
    } catch (error) {
        console.log(error.message)
    }
}

const updateMessage = async (req,res) => {
    const {id,file,name} =req.body
    try {
        const messageFound = await Message.findOne({where:{id}})
        if(messageFound == null) res.json({message:"No such message"})
        const updatedMessage = {
            name:name ? name : messageFound.name,
            file:file ? file : messageFound.file
        }
        await Message.update(updatedMessage,{
            where:{
                email:email
            }
        })

        res.json({message:"Message updated successfully"})
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    createMessage,
    deleteMessage,
    getMessages,
    getMessage,
    updateMessage
}