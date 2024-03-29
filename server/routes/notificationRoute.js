const express = require('express')
const router = express.Router()

const {createNotification,deleteNotification,getNotifications,updateNotification} = require("../controllers/notificationController")

router.route("/").get(getNotifications)

router.route("/").post(createNotification)

router.route("/").put(updateNotification)

router.route("/").delete(deleteNotification)

module.exports  = router
