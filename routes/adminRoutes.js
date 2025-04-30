const express = require("express")
const { createClient, getAllClients, getClientById, updateClient, deleteClient } = require("../Controllers/adminControllers")
const adminMiddleware = require("../Middlewares/adminMiddlewares")
const router = express.Router()


//ADMIN CAN CREATE CLIENTS

router.post("/createClient",adminMiddleware, createClient)

//ADMIN CAN FETCH ALL CLIENTS

router.get("/getAllClients", adminMiddleware, getAllClients);

//ADMIN CAN GET CLIENTS BY ID
router.get("/getCliendById",adminMiddleware, getClientById)

//ADMIN CAN UPDATE A SPECIFIC CLIENT DETAILS
router.put("/updateClient", adminMiddleware, updateClient);

//ADMIN CAN DELETE A SPECIFIC CLIENT DETAILS
router.delete("/deleteClient", adminMiddleware,deleteClient);

module.exports = router