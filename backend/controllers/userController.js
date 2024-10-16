import validator from "validator"
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
const registerUser=async (req,res) => {
    try {
        const {name,email,password}=req.body;
if(!name ||!email||!password){
    return res.json({success:false,message:"Missing details"});
}
if(!validator.isEmail(email)){
    return res.json({success:false,message:"Missing details"});
}
//validationg strong password
if(password.length<8){
    return res.json({success:false,message:"Enter a strong password"});
}
//hashing user password
const salt=await bcrypt.genSalt(10);
const hashedPass=await bcrypt.hash(password,salt);
const userData={
    name,email,password:hashedPass
};
const newUser=new userModel(userData);
const user =await newUser.save();
//_id
const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
res.json({success:true,token});
 } catch (error) {
        console.error(error.message);
        res.json({success:false,message:error.message});
    }
}
const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body;
    const user=await userModel.findOne({email})
    if(!user){
        return res.json({success:false,message:"User not Found"})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(isMatch){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
    }else{
        res.json({success:false,message:"invalid credentials"});
    }
} catch (error) {
    
}
}

export{registerUser,loginUser};