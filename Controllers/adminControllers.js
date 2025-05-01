//ADMIN CAN ONLY CREATE CLIENTS - CLIENT CONTROLLERS NEEDS TO BE IN THIS FILE

const { Client } = require("../Models/clientModel");

exports.createClient = async(req,res) => {
    try{
        // console.log("in")

        const userId = req.userId;

        // console.log(userId);

        const {name,email,companyName,address,phoneNo} = req.body;

        // console.log(name,email,companyName,address,phoneNo)

        const checkClient = await Client.findOne({email})

        if(checkClient){
            return res.status(401).json({
                success:false,
                message:"Client already exists!"
            })
        }
        else{
            
            const newClient = await Client.create({
                userId:userId,
                name:name,
                email:email,
                company_Name:companyName,
                address:address,
                phone_Number:phoneNo
            })

            return res.status(200).json({
                success:true,
                message:"Client created!",
                newClient
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Couldn't create clients at the moment, please try again!"
        })
    }
}

//GET ALL CLIENTS
exports.getAllClients = async(req,res) => {
    try{

        const userId = req.userId

        // console.log("userId in getAllClients-> ", userId)

        const allClients = await Client.find({userId});
        
        console.log("all clients-> ", allClients)

        return res.status(200).json({
            success:true,
            message:"fetched all clients",
            allClients
        })

    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"Could not fetch clients"
        })
    }
}

//GET CLIENT BY ID
exports.getClientById = async(req,res) => {
    try{
        
        const {clientId} = req.query;

        // console.log("clientId from params-> ", clientId);

        //check if client exists or not
        const checkClient = await Client.findById({_id:clientId})

        if(checkClient){
            return res.status(200).json({
                success:true,
                message:"Client fetched!",
                checkClient
            })
        }
        else{
            return res.status(404).json({
                success:false,
                message:"Client does not exist"
            })
        }

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not fetch client details!"
        })
    }
}

//UPDATE A CLIENTS DETAILS
exports.updateClient = async(req,res) => {
    try{
        const {name, email,address, phoneNo} = req.body;

        const{clientId} = req.query;

        const checkUser = await Client.findByIdAndUpdate({_id:clientId},{
            name:name,
            email:email,
            address:address,
            phoneNo:phoneNo
        },{new:true})
        const updatedClient = checkUser
        return res.status(200).json({
            success:true,
            message:"Client details updated!",
            updatedClient
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"operation could not be done!"
        })
    }
}

//DELETE A SPECIFIC CLIENT
exports.deleteClient = async(req,res) => {
    try{
        const {clientId} = req.query;

        await Client.findByIdAndDelete({_id:clientId})

        return res.status(200).json({
            success:true,
            message:"Client deleted!"
        })
    }catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"could not delete client!"
        })
    }
}