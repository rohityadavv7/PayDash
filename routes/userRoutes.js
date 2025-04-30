const express = require("express")
const { Signup, Login } = require("../Controllers/userControllers")
const router = express.Router()

router.post("/signup", Signup)
router.post("/login", Login)

module.exports = router