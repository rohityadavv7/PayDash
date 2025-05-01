const express = require("express")
const { Signup, Login, getMyProfile, updateProfile, deletProfile } = require("../Controllers/userControllers")
const authMiddleware = require("../Middlewares/authMiddleware")
const router = express.Router()

router.post("/signup", Signup)
router.post("/login", Login)

//GET USERS PROFILE
router.get("/getMyProfile/me", authMiddleware, getMyProfile)

//UPDATE USERS PROFILE
router.put("/updateProfile/me", authMiddleware, updateProfile);

//DELETE PROFILE
router.delete("/deleteProfile/me", authMiddleware, deletProfile);

module.exports = router