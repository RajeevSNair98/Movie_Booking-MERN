import axios from 'axios'

 const getAllMovies = async()=>{
   const res = await axios.get('http://localhost:5000/movie')
   .catch((err)=> console.log(err))

   if(res.status !== 200){
    return console.log("No data");
   }

   const data = await res.data
   return data;
}


const sendUserAuth = async(data,signUp)=>{
 const res = await axios.post(`http://localhost:5000/user/${signUp ? "signup" : "login"}`,{
    name: signUp ? data.name : '',
    email:data.email,
    password:data.password
  })
  .catch((err)=>console.log(err))

  if(res.status !==200 && res.status !==201){
      console.log('Error occured');
  }

  const resData = await res.data
  return resData;

}


const sendAdminAuth = async(data)=>{
  const res = await axios.post('http://localhost:5000/admin/login/',{
    email: data.email,
    password:data.password
  })
  .catch((err)=>console.log(err))

  if(res.status !==200){
    return console.log("Error occured");
  }

  const resData = await res.data
  return resData

}


const getMovieDetails = async(id)=>{
 const res = await axios.get(`http://localhost:5000/movie/${id}`)
  .catch((err)=>console.log(err))

  if(res.status !==200){
    return console.log("Error occured");
  }

  const resData = await res.data
  return resData
}


const newBooking = async (data) => {
  const res = await axios
    .post("http://localhost:5000/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};


const getUsersBookings = async()=>{
  const id = localStorage.getItem('userId')
 const res = await axios.get(`http://localhost:5000/user/bookings/${id}`)
    .catch((err)=>console.log(err))

    if(res.status !==200){
      return console.log("Error occured");
    }

    const resData = await res.data;
    return resData
}


const deleteBooking = async(id)=>{
  const res = await axios.delete(`http://localhost:5000/booking/${id}`)
  .catch((err)=>console.log(err))

  if(res.status !==200){
    return console.log("Error occured");
  }

  const resData = await res.data
  return resData

}

const getUserDetails = async()=>{
  const id =await localStorage.getItem('userId')
  const res = await axios.get(`http://localhost:5000/user/${id}`)
  .catch((err)=>console.log(err))

  if(res.status !==200){
    return console.log('Error occured');
  }

  const resData = await res.data
  return resData
}


const addMovie = async(data)=>{
 const res = await axios.post('http://localhost:5000/movie', {
  title: data.title,
  description: data.description,
  releaseDate: data.releaseDate,
  posterUrl: data.posterUrl,
  fetaured: data.fetaured,
  actors: data.actors,
  admin: localStorage.getItem("adminId"),
},
{
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .catch((err)=>console.log(err))

  if(res.status !== 200){
    return console.log('Error occured');
  }

  const resData = await res.data
  return resData;

}


const getAdminById = async()=>{
  const adminId = localStorage.getItem('adminId')
 const res = await axios.get(`http://localhost:5000/admin/${adminId}`)
  .catch((err)=>console.log(err))

  if(res.status !==200){
    return console.log('Error occured');
  }

  const resData = await res.data
  return resData
}


export  {getAllMovies,sendUserAuth,sendAdminAuth,getMovieDetails,newBooking,
          getUsersBookings,deleteBooking,getUserDetails,addMovie,getAdminById}