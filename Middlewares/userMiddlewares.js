const jwt = require("jsonwebtoken")

const userMiddleware = async(req,res,next) => {
    try{
        const {token} = req.headers;

        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token not found"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        console.log("token details-> ",decodedToken)

        

        //check if user already exists as Client to some admin
        const checkUserAsClient = await 
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Someting went wrong in user middleware!"
        })
    }
}

module.exports = userMiddleware