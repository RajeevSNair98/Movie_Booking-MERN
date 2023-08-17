const express = require('express')
const mongoose = require('mongoose')
const dotenv  = require('dotenv');
const cors = require('cors')
const userRouter = require('./routes/user-routes');
const adminRouter = require('./routes/admin-routes');
const movieRouter = require('./routes/movie-routes');
const bookingsRouter = require('./routes/booking-routes');
const app = express();

dotenv.config()

app.use(cors())
app.use(express.json())
app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use('/movie',movieRouter)
app.use('/booking',bookingsRouter)

mongoose.connect(`mongodb+srv://rajeev:${process.env.MONGODB_PASSWORD}@cluster0.15zde0p.mongodb.net/MovieApp?retryWrites=true&w=majority`)
.then(()=>
app.listen(5000,()=>{
    console.log(`Connected to Database`);
})
).catch((error)=> console.log(error))




