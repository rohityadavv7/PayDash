//ALL THE CONTROLLERS RELATED TO INVOICE NEEDS TO BE HERE

const { Client } = require("../Models/clientModel");
const { Invoice } = require("../Models/invoiceModel");

exports.createInvoice = async(req,res) => {
    try{

        const userId = req.userId;

        // console.log("userId in invoice-> ", userId)

        const {clientId, invoiceDetails} = req.body;

        // console.log(clientId, invoiceDetails);

        if(!clientId || !invoiceDetails){
            return res.status(403).json({
                success:false,
                message:"insufficient Credentials!"
            })
        }

        const checkClient = await Client.findById({_id:clientId})

        if(checkClient){

            const newInvoice = await Invoice.create({
                userId:userId,
                clientId:clientId,
                date:invoiceDetails.date,
                due_Date:invoiceDetails.due_Date,
                items:invoiceDetails.items,
                tax:invoiceDetails.tax,
                discount:invoiceDetails.discount,
                total:invoiceDetails.total,
                currency:invoiceDetails.currency,
                notes:invoiceDetails.notes,
                status:invoiceDetails.status,
                
            })
    
            return res.status(200).json({
                success:true,
                message:"Invoice created",
                newInvoice
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"client not found!"
            })
        }

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"Failed to create Invoice, try again!"
        })
    }
}

//GET ALL INVOICES AS ADMIN
exports.getAllInvoices = async(req,res) => {
    try{
        const userId = req.userId

        const allInvoices = await Invoice.find({userId})

        // console.log("all invoices related to admin-> ", allInvoices)

        return res.status(200).json({
            success:true,
            message:"invoices fetched!",
            allInvoices
        })
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Could not fetch invoices!"
        })
    }
}

//GET A SINGLE INVOICE BY ID
exports.getInvoiceById = async(req,res) => {
    try{
        const {clientId} = req.query;

        console.log("id-> ", clientId)

        const clientInvoice = await Invoice.findOne({clientId:clientId})

        console.log("invoice details of a client-> ", clientInvoice);

        return res.status(200).json({
            success:true,
            message:"Invoice fetched!",
            clientInvoice
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not fetch invoice!"
        })
    }
}

//UPDATE AN INVOICE
exports.updateInvoice = async(req,res) => {
    try{
        const {invoiceId,invoiceDetails} = req.body;


        const updatedInvoice = await Invoice.findByIdAndUpdate({_id:invoiceId},{
            date:invoiceDetails.date,
            due_Date:invoiceDetails.due_Date,
            items:invoiceDetails.items,
            tax:invoiceDetails.tax,
            total:invoiceDetails.total,
            currency:invoiceDetails.currency,
            status:invoiceDetails.status
        },{new:true})

        return res.status(200).json({
            success:true,
            message:"Invoice updated!",
            updatedInvoice
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not update invoice!"
        })
    }
}

//DELETE AN INVOICE
exports.deleteInvoice = async(req,res) => {
    try{

        const {invoiceId} = req.body;

        // console.log(invoiceId)

        const invoiceToDelete = await Invoice.findOne({_id:invoiceId})

        if(invoiceToDelete.status !== "paid"){
            return res.status(403).json({
                success:false,
                message:`Invoice can't be deleted as the status is ${invoiceToDelete.status}`
            })
        }

        invoiceToDelete = await Invoice.findOneAndDelete({
            _id:invoiceId,
        })

        return res.status(200).json({
            success:true,
            message:"Invoice deleted!",
            invoiceToDelete
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not delete Invoice!"
        })
    }
}

//SEND AN INVOICE TO GMAIL
exports.sendInvoice = async(req,res) => {
    try{
        const {invoiceDetails} = req.body;

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to send Invoice!"
        })
    }
}