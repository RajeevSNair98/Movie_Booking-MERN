const async = require('hbs/lib/async')
const userCollection = require('../models/User')
const bcrypt = require('bcrypt')

exports.getAllUsers = async(req,res,next)=>{
    let users
    try {
     users = await userCollection.find({})
    } catch (error) {
        return next(error)
    }
    if(!users){
        return res.status(500).json({
            message:'Unexpected error occured'
        })
    }

    return res.status(200).json({users:users})
}




exports.signUp = async(req,res,next)=>{
    const {name,email,password} = req.body

    if(!name && name.trim() === '' &&!email && email.trim()==="" &&!password && password.trim()===''){
        return res.status(422).json({message:'Invalid inputs'})
    }

    const hashedPassword = bcrypt.hashSync(password,10)
    let user;
    try {
        user =await new userCollection({name,email,password:hashedPassword}).save()
    } catch (error) {
        return next(error)
    }

    if(!user){
        return res.status(500).json({message:'Unexpected error occured'})
    }

    return res.status(201).json({id:user._id})
}



exports.updateUser = async(req,res,next)=>{

    const id = req.params.id;
    const {name,email,password} = req.body

    if(!name && name.trim() === '' &&!email && email.trim()==="" &&!password && password.trim()===''){
        return res.status(422).json({message:'Invalid inputs'})
    }

    const hashedPassword = bcrypt.hashSync(password,10)


    let user;
    try {
        user = await userCollection.findByIdAndUpdate(id,{name,email,password:hashedPassword})
    } catch (error) {
        return console.log(error);
    }

    if(!user){
        return res.status(500).json({message:'Something went wrong'})
    }

    res.status(200).json({message:'Updated successfully'})

}


exports.deleteUser = async(req,res,next)=>{
    const id = req.params.id

    let user;
    try {
        user = await userCollection.findByIdAndRemove(id)
    } catch (error) {
        console.log(error);
    }

    if(!user){
        return res.status(500).json({message:'Something went wrong'})
    }

    res.status(200).json({message:"Deleted Successfully"})
}



exports.login = async(req,res,next)=>{
    const {email,password} = req.body

    if(!email && email.trim()==="" &&!password && password.trim()===''){
        return res.status(422).json({message:'Invalid inputs'})
    }

    let existingUser;
    try {
        existingUser = await userCollection.findOne({email})
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        res.status(404).json({message:'Unable to find user'})
    }

    const comparePassword = bcrypt.compareSync(password,existingUser.password)
    if(!comparePassword){
        return res.status(400).json({message:'Password is incorrect'})
    }

    return res.status(200).json({message:"Login successful", id:existingUser._id})
}


exports.getUserById = async(req,res,next)=>{
    const id = req.params.id
    let user
    try {
     user = await userCollection.findById(id)
    } catch (error) {
        return next(error)
    }
    if(!user){
        return res.status(500).json({
            message:'Unexpected error occured'
        })
    }

    return res.status(200).json({user})
}
