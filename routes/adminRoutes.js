const express = require("express")
const { createClient } = require("../Controllers/adminControllers")
const adminMiddleware = require("../Middlewares/adminMiddlewares")
const router = express.Router()


//ADMIN CAN CREATE CLIENTS

router.post("/createClient",adminMiddleware, createClient)

module.exports = router