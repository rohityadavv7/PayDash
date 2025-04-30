const express = require("express")
const { createInvoice } = require("../Controllers/invoiceControllers")
const adminMiddleware = require("../Middlewares/adminMiddlewares")
const router = express.Router()

router.post("/createInvoice", adminMiddleware,createInvoice)

module.exports = router