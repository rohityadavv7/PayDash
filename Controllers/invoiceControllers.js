//ALL THE CONTROLLERS RELATED TO INVOICE NEEDS TO BE HERE

exports.createInvoice = async(req,res) => {
    try{
        const {} = req.body;
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to create Invoice, try again!"
        })
    }
}