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