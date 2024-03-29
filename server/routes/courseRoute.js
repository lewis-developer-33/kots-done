const express = require('express')
const router = express.Router()

const {getCourses,updateCourse,createCourse,deleteCourse} = require('../controllers/courseController')

router.route("/").get(getCourses)

router.route("/").post(createCourse)

router.route("/").put(updateCourse)

router.route("/").delete(deleteCourse)

module.exports  = router
