import jwt from "jsonwebtoken";

import {ENV_VAR} from "../Config/enVar.js";

export const generateJwtToken = (userId,res) => {
    
    console.log("called jwt token");
       //console.log(ENV_VAR.NODE_ENV);
                           //payload,secret,expiration
    const token = jwt.sign({userId},ENV_VAR.JWT_SECRET,{expiresIn:"15d"});
    console.log(token);
    
    
    return token;
    
};