const express = require('express')
const router = express.Router()

const {createSchool,deleteSchool,getSchools,updateSchool} = require("../controllers/schoolController")

router.route("/").get(getSchools)

router.route("/").post(createSchool)

router.route("/").put(updateSchool)

router.route("/").delete(deleteSchool)

module.exports  = router
