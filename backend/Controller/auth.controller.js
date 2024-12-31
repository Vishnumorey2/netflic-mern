import {User} from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { generateJwtToken } from "../utils/generate.jwttoken.js";

export async function signup(req, res) {
    try{
        const {username,email,password} = req.body;
    if(!email || !username || !password){
      return  res.status(400).json({success:false, message:"All fields are required"});
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(email)){
      return  res.status(400).json({success:false, message:"Email is not valid"});
    }

    if(password.length < 6){
      return  res.status(400).json({success:false, message:"Password must be at least 6 characters"});
    }

    const existinguseremail = await User.findOne({email:email});

    if(existinguseremail){
      return  res.status(400).json({success:false, message:"Email already exists"});
    }

    const existingusername = await User.findOne({username:username});

    if(existingusername){
      return  res.status(400).json({success:false, message:"Username already exists"});
    }

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password,salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newuser = new User({
      username:username,
      email:email,
      password:hash,
      image:image,
    });
     
    
        const token = generateJwtToken(newuser._id, res);
      //   res.cookie("jwt-netflix-n",token,{
      //     httpOnly:true,
      //     maxAge:15*24*60*60*1000,
      //     sameSite:"lax",
      //     secure:false,//ENV_VAR.NODE_ENV !== "development"
      // });
        await newuser.save();
        
        res.cookie('jwt-netflix',token).status(201).json({success:true, user: {...newuser._doc,password:""}});
   

   
    }catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}



export async function login(req, res) {
  const {email,password} = req.body;

    try{
       
        if(!email || !password){
        return  res.status(400).json({success:false, message:"All fields are required"});
        }

        const user = await User.findOne({email:email});
        if(!user){
        return  res.status(400).json({success:false, message:"User not found"});
        }

        if (!user.password || typeof user.password !== 'string') {
          return res.status(500).json({ success: false, message: "Password stored incorrectly" });
        }

       
          const ispasswordvalid = await bcryptjs.compare(password,user.password);
        
        

       if(!ispasswordvalid){
        return  res.status(400).json({success:false, message:"Invalid credentials"});
        }

        const token = generateJwtToken(user._id, res);
        res.cookie("jwt-netflix",token).status(200).json({success:true, user: {...user._doc,password:""}, token});
        }catch(error){
          console.log(error);
            res.status(500).json({success:false,message:"Internal server error"});
        }
}

export async function signin(req, res) {
  res.send("signin route");
}

export async function logout(req, res) {
    try{
        res.clearCookie("jwt-netflix");
        res.send({success:true,message:"Logged out successfully"});
    }catch(error){
        res.send(500).json({success:false,message:"Internal server error"});
    }
    
    }
    
export async function authCheck(req, res) {
    try{
        res.status(200).json({success:true,user:req.user});
    }catch(error){
      console.log("error in authcheck controller",error);
        res.send(500).json({success:false,message:"Internal server error"});
    }
    
}