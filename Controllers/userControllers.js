
const { User } = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { Client } = require("../Models/clientModel");
const { Invoice } = require("../Models/invoiceModel");
const mongoose = require("mongoose")

exports.Signup = async(req,res) => {
   try{

        const {name,email,password, role_Type} = req.body;
        console.log(name,password,email)

        let checkUserAsClient;
        let invoicesList;
        let adminName;

        if(!name || !email || !password){
            return res.status(403).json({
                success:false,
                message:"insufficient data"
            })
        }

        if(role_Type === "user"){
            
            //check in clients schema if user already exists as client to some admin
             checkUserAsClient = await Client.findOne({email})

            if(checkUserAsClient){
                //get all the invoices related to this user
                invoicesList = await Invoice.find({_id:checkUserAsClient._id})

                if(invoicesList.length === 0){
                    const admin = await User.findById({_id:checkUserAsClient.userId})

                    // console.log("admin details -> ", admin)

                    adminName = admin.name;
                }
            }
        }

        const checkUser = await User.findOne({email})

        if(checkUser){
            return res.status(401).json({
                success:false,
                message:"User already exists, please login!"
            })
        }
        else{

            //hash the password before storing it in Database
            const hashedPass = await bcrypt.hash(password,10);
            console.log(hashedPass)

            const createdUser = await User.create({
                name:name,
                email:email,
                passwordHash:hashedPass,
                role_Type:role_Type
            })

            const responseData = {
                success: true,
                message: "User signed up!",
                createdUser,
              };
              
              if (checkUserAsClient) {
                
                if(invoicesList.length !== 0){
                    responseData.notice = "We have found invoices under your name";
                    responseData.Invoices = invoicesList
                }
                else{
                    responseData.notice = `Welcome, you are already added as Client by ${adminName}`;
                }
              }
              else{
                if(role_Type === "user")
                    responseData.notice = "No invoices found!"
              }

            return res.status(200).json({
                success:true,
                message:"user signed up!",
                responseData
            })
        }

   }catch(error){
    console.log(error.message)
    return res.status(500).json({
        message:false,
        message:"something went wrong signing up, try again later!"
    })
   }
}

exports.Login = async(req,res) => {
    try{
        const {email, password} =  req.body;

        console.log(email, password)

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Insufficient credentials!"
            })
        }

        const checkUser = await User.findOne({email});

        if(checkUser){

            //verify the password

            if(await bcrypt.compare(password,checkUser.passwordHash)){
                const token = jwt.sign({
                    userId:checkUser._id
                },process.env.JWT_SECRET)
    
                console.log(token)
    
                return res.status(200).json({
                    success:true,
                    message:"User logged in!",
                    token
                })
            }
            else{
                return res.status(401).json({
                    success:false,
                    message:"Incorrect password!"
                })
            }
            
        }
        else{
            return res.status(404).json({
                success:false,
                message:"User not registered, sign up first!"
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong loggin in!, please try again!"
        })
    }
}

//GET CURRENT USER PROFILE
exports.getMyProfile = async(req,res) => {
    try{
        const verificationId = req.verificationId

        console.log("got the if-> ", verificationId)

        const myProfileData = await User.findById({_id:verificationId})

        console.log("user data -> ", myProfileData)

        return res.status(200).json({
            success:true,
            message:"fetched profile data",
            myProfileData
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Couldn;t fetch your data!"
        })
    }
}

//UPDATE USER PROFILE
exports.updateProfile = async(req,res) => {
    try{
        const {name,email,password} = req.body;

        const verificationId = req.verificationId

        // console.log(name,email,password)

        //check for user
        const updatedProfile = await User.findByIdAndUpdate({_id:verificationId},{
            name:name,
            email:email,
            passwordHash:password
        },{new:true})

        return res.status(200).json({
            success:true,
            message:"Profile updated!",
            updatedProfile
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Could not update your profile"
        })
    }
}

//DELETE USER DATA
exports.deletProfile = async(req,res) => {
    try{
        const verificationId = req.verificationId

        console.log(verificationId)

        const userData = await User.findById({_id:verificationId})
        console.log("user data -> ", userData)

        if(userData.role_Type === "admin"){

            const clientsData = await Client.find({userId:verificationId});
        
            // console.log("all clients-> ", clientsData)


            if(clientsData.length !== 0){
                return res.status(403).json({
                    success:false,
                    message:"Clear your clients first!"
                })
            }
            else{
                await User.findByIdAndDelete({_id:userData._id})

                return res.status(200).json({
                    success:true,
                    message:"Profile deleted!"
                })
            }
        }
        else{

            const invoiceList = await User.aggregate([
                {
                  $match: { _id: new mongoose.Types.ObjectId(verificationId)  }  
                },
                {
                  $lookup: {
                    from: 'clients',  
                    localField: 'email',  
                    foreignField: 'email',  
                    as: 'clientDetails'  
                  }
                },
                {
                  $unwind: '$clientDetails'  
                },
                {
                  $lookup: {
                    from: 'invoices', 
                    localField: 'clientDetails._id',  
                    foreignField: 'clientId',  
                    as: 'invoices'  
                  }
                },
                {
                  $unwind: '$invoices'  
                },
                {
                  $project: {
                    'invoices._id': 1,
                    'invoices.date': 1,
                    'invoices.total': 1,
                    'invoices.status': 1,
                    'invoices.clientId': 1,  
                    'invoices.items': 1,
                    'invoices.notes': 1,
                  }
                }
              ]);


              console.log("invoices-> ",invoiceList)

            if(invoiceList.length !== 0){
                return res.status(403).json({
                    success:false,
                    message:"Clear your Invoices first!"
                })
            }
            

            await User.findByIdAndDelete({_id:userData._id})

            return res.status(200).json({
                success:true,
                message:"Profile deleted!"
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong!"
        })
    }
}