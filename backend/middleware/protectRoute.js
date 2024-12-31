import { ENV_VAR } from "../Config/enVar.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
    try{
        
        const token = req.cookies["jwt-netflix-n"];


        if(!token){
            return res.status(401).json({success:false,message:"token not found"});
        }

       const decoded = jwt.verify(token,ENV_VAR.JWT_SECRET);
       if(!decoded){
        return res.status(401).json({success:false,message:"token not verified"});
       }

       const user = await User.findById(decoded.userId).select("-password");

       if(!user) return res.status(401).json({success:false,message:"Login to access this resource"});
       req.user = user;
       next();
    }catch(error){
        console.log("error in protectRoute",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export default protectRoute;