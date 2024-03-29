const express = require('express')
const router = express.Router()

const {createMessage,deleteMessage,getMessages,updateMessage} = require("../controllers/messageController")

router.route("/").get(getMessages)

router.route("/").post(createMessage)

router.route("/").put(updateMessage)

router.route("/").delete(deleteMessage)

module.exports  = router
