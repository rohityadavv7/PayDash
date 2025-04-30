const jwt = require("jsonwebtoken")
const { User } = require("../Models/userModel")

const adminMiddleware = async(req,res,next)=> {

    const {token} = req.headers

    console.log(token)

    if(!token){
        return res.status(404).json({
            success:false,
            message:"Token not found!"
        })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const userDetails = await User.findById({_id:decodedToken.userId})

    console.log("user details in middlewares -> ",userDetails)

    if(userDetails.role_Type === "admin"){
        
        console.log("token details->",decodedToken)

        req.userId = decodedToken.userId

        next();
    }
    else{
        return res.status(403).json({
            success:false,
            message:"Admin protected route!"
        })
    }
  
}

module.exports = adminMiddleware