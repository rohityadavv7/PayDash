
const { User } = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.Signup = async(req,res) => {
   try{

        const {name,email,password} = req.body;
        console.log(name,password,email)

        if(!name || !email || !password){
            return res.status(403).json({
                success:false,
                message:"insufficient data"
            })
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
                passwordHash:hashedPass
            })

            return res.status(200).json({
                success:true,
                message:"user signed up!",
                createdUser
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