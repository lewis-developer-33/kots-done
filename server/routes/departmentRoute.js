const express = require('express')
const router = express.Router()

const {getDepartments,getDepartment,updateDepartment,createDepartment,deleteDepartment} = require('../controllers/departmentController')

router.route("/").get(getDepartments)

router.route("/").get(getDepartment)

router.route("/").post(createDepartment)

router.route("/").put(updateDepartment)

router.route("/").delete(deleteDepartment)

module.exports  = router
