
const { User } = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { Client } = require("../Models/clientModel");
const { Invoice } = require("../Models/invoiceModel");

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

                    console.log("admin details -> ", admin)

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