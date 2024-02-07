const { JsonWebTokenError } = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.models"); 

const authMiddleware = async (req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if(!token){
            throw new ApiError(401, "Unauthorized request - Token Not found")
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await UserModel.findById(decode._id);

        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
        
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(502, "Unable to verify the access token")
    }
}
module.exports = {authMiddleware};