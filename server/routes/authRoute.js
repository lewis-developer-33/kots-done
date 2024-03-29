const express = require('express')
const { registerUser, logInUser, currentUser } = require('../controllers/authController')
const validateToken = require("../middleware/validateToken")
const {withJWTAuthMiddleware} = require('express-kun')
const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router,process.env.ACCESS_TOKEN)

router.route("/register").post(registerUser)
router.route("/login").post(logInUser)
protectedRouter.get("/current",currentUser)

module.exports  = router
