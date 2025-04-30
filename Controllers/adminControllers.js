//ADMIN CAN ONLY CREATE CLIENTS - CLIENT CONTROLLERS NEEDS TO BE IN THIS FILE

const { Client } = require("../Models/clientModel");

exports.createClient = async(req,res) => {
    try{
        console.log("in")

        const userId = req.userId;

        console.log(userId);

        const {name,email,companyName,address,phoneNo} = req.body;

        console.log(name,email,companyName,address,phoneNo)

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