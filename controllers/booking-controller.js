const { default: mongoose } = require("mongoose");
const bookingCollection = require("../models/Bookings");
const movieCollection = require("../models/Movie");
const userCollection = require("../models/User");


exports.newBooking = async(req,res,next)=>{
    const {movie,date,seatNumber,user} = req.body

    let existingMovie;
    let existingUser;
    try {
        existingMovie = await movieCollection.findById(movie)
        existingUser = await userCollection.findById(user)
    } catch (error) {
        return console.log(error);
    }

    if(!existingMovie){
        return res.status(404).json({message:"Movie not found with the given id"})
    }
    
    if(!existingUser){
        return res.status(404).json({message:"User not found with the given id"});
    }


    let booking;
    try {
        booking =await new bookingCollection({movie,date: new Date(`${date}`),seatNumber,user})
    
        const session =await mongoose.startSession()
        session.startTransaction()
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking)
        await existingUser.save({session})
        await existingMovie.save({session})
        await booking.save()
        session.commitTransaction()

    } catch (error) {
        return console.log(error);
    }

    if(!booking){
        return res.status(500).json({message:'Unable to book'})
    }

    return res.status(201).json({booking:booking})
}



exports.getBookingById = async(req,res,next)=>{
    const id = req.params.id;
    let booking;
    try {
        booking = await bookingCollection.findById(id)
    } catch (error) {
        return console.log(error);
    }

    if(!booking){
        return res.status(500).json({message:"Unexpected Error"})
    }

    return res.status(200).json({booking})
}



exports.deleteBooking = async(req,res,next)=>{
    const id = req.params.id
    let booking;
    try {
        booking = await bookingCollection.findByIdAndRemove(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction()
        await booking.user.bookings.pull(booking)
        await booking.movie.bookings.pull(booking)
        await booking.movie.save({session})
        await booking.user.save({session})
        session.commitTransaction()
    } catch (error) {
        return console.log(error);
    }

    return res.status(200).json({message:"Successfully deleted"})

}


exports.getBookingOfUser = async(req,res,next)=>{
    const id = req.params.id
    let booking;
    try {
        booking = await bookingCollection.find({user:id}).populate("movie").populate("user");
    } catch (error) {
        return console.log(error);
    }

    if(!booking){
        return res.status(500).json({message:"Unable to get bookings"})
    }

    return res.status(200).json({booking})
}