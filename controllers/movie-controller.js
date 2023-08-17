const jwt = require('jsonwebtoken');
const movieCollection = require('../models/Movie');
const { default: mongoose } = require('mongoose');
const adminCollection = require('../models/Admin');

exports.addMovie = async(req,res,next)=>{
    
    const extractedToken = req.headers.authorization.split(" ")[1]
    if(!extractedToken && extractedToken.trim()===''){
        return res.status(404).json({message:'Token not found'})
    }

    
    // verify token
    let adminId;
    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err){
            return res.status(400).json({message:`${err.message}`})
        }else{
            adminId = decrypted.id
            return;
        }
    })


    //create new movie
    const {title,description,actors,releaseDate,posterUrl,featured} = req.body
    if(!title && title.trim()==='' && !description && description.trim()==='' && !actors && actors.trim()==='' &&
    !releaseDate && releaseDate.trim()==='' && !posterUrl && posterUrl.trim()==='' &&
    !featured && featured.trim()===''){
        return res.status(422).json({message:"Invalid inputs"})
    }

    let movie;
    try {
        movie =await new movieCollection(
            {title,description,actors,releaseDate:new Date(`${releaseDate}`),posterUrl,featured,admin:adminId})
            
            const session = await mongoose.startSession();
            const adminUser = await adminCollection.findById(adminId)
            session.startTransaction();
            await movie.save({session})
            adminUser.addedMovies.push(movie)
            await adminUser.save({session})
            await session.commitTransaction();


        } catch (error) {
        return console.log(error);
    }

    if(!movie){
       return res.status(500).json({message:"Request Failed"}) 
    }

    return res.status(200).json({movie})
}



exports.getAllMovies = async(req,res,next)=>{
    let movies;
    try {
        movies = await movieCollection.find()
    } catch (error) {
        return console.log(error);
    }

    if(!movies){
        return res.status(500).json({message:"Request failed"})
    }

    return res.status(200).json({movies})
}


exports.getMovieById = async (req, res, next) => {
    const id = req.params.id;
    let movie;
    try {
      movie = await movieCollection.findById(id);
    } catch (err) {
      return console.log(err);
    }
  
    if (!movie) {
      return res.status(404).json({ message: "Invalid Movie ID" });
    }
  
    return res.status(200).json({ movie });
  };