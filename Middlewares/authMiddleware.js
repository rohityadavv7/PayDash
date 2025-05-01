const jwt = require("jsonwebtoken")

const authMiddleware = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];

    // console.log("token in authMiddleware-> ",token)

    if(!token){
        return res.status(403).json({
            succes:false,
            message:"token not found!"
        })
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

    // console.log("decoded token in auth-> ", decodeToken)

    req.verificationId = decodeToken.userId;

    next();
}

module.exports = authMiddleware