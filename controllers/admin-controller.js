const adminCollection = require("../models/Admin");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addAdmin = async(req,res,next)=>{
    const {email,password} = req.body

    if(!email && email.trim()==="" &&!password && password.trim()===''){
        return res.status(422).json({message:'Invalid inputs'});
    }
    
    let existingAdmin;
    try {
        existingAdmin = await adminCollection.findOne({email})
    } catch (error) {
        return console.log(error);
    }

    if(existingAdmin){
        return res.status(400).json({message:"Admin already exists"})
    }

    let admin;
    const hashedPassword = bcrypt.hashSync(password,10)
    try {
        admin =await new adminCollection({email,password:hashedPassword}).save()
    } catch (error) {
        return console.log(error);
    }

    if(!admin){
        return res.status(500).json({message:'Unable to add admin'})
    }

    return res.status(201).json({admin})

}


exports.adminLogin = async(req,res,next)=>{
    const {email,password} = req.body

    if(!email && email.trim()==="" &&!password && password.trim()===''){
        return res.status(422).json({message:'Invalid inputs'})
    }
    
    let existingAdmin;
    try {
        existingAdmin = await adminCollection.findOne({email})
    } catch (error) {
        return console.log(error);
    }

    if(!existingAdmin){
        return res.status(400).json({message:'Admin not found'})
    }

    
    const comparePassword = bcrypt.compareSync(password,existingAdmin.password)
    if(!comparePassword){
        return res.status(400).json({message:'Incorrect password'})
    }

    const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY, {expiresIn:"7d"})

    return res.status(200).json({
        message:"Authentication successful",
        token,
        id:existingAdmin._id
    })

}


exports.getAdmins = async(req,res,next)=>{
    let admins;
    try {
        admins = await adminCollection.find()
    } catch (error) {
        return console.log(error);
    }

    if(!admins){
        return res.status(500).json({message:"internal server error"})
    }

    return res.status(200).json({admins})
}


exports.getAdminById = async(req,res,next)=>{
    const id = req.params.id

    let admin;
    try {
        admin = await adminCollection.findById(id).populate("addedMovies")
    } catch (error) {
        return console.log(error);
    }

    if(!admin){
        return console.log("Cannot find admin");
    }

    return res.status(200).json({admin})
}