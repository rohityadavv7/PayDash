const express = require("express")
const { createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice } = require("../Controllers/invoiceControllers")
const adminMiddleware = require("../Middlewares/adminMiddlewares")
const router = express.Router()

router.post("/createInvoice", adminMiddleware,createInvoice)

//ADMIN CAN GET ALL CREATED INVOICES
router.get("/getAllInvoices/me", adminMiddleware, getAllInvoices);

//GET AN INVOICE BY ID
router.get("/getInvoice/id", adminMiddleware,getInvoiceById)

//UPDATE AN INVOICE
router.put("/updateInvoice", adminMiddleware,updateInvoice)

//DELETE AN INVOICE
router.delete("/deleteInvoice", adminMiddleware,deleteInvoice);

module.exports = router