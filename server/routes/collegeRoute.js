const express = require('express')
const router = express.Router()

const {createCollege,deleteCollege,getColleges,updateCollege} = require("../controllers/collegeController")

router.route("/").get(getColleges)

router.route("/").post(createCollege)

router.route("/").put(updateCollege)

router.route("/").delete(deleteCollege)

module.exports  = router
