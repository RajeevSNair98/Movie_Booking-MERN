import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState } from 'react'
import { Link } from "react-router-dom";


const AuthForm = ({onSubmit,isAdmin}) => {

    const [isSignUp,setIsSignUp] = useState(false)
    const [inputs,setInputs] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(inputs);
        onSubmit({inputs,signUp: isAdmin ? false : isSignUp})

    }

  return (
    <Dialog open={true}>

        <Box sx={{ml:'auto', padding:1}}>
            <IconButton LinkComponent={Link} to='/'>
                <CloseRoundedIcon/>
            </IconButton>
        </Box>

        <Typography variant='h4' textAlign={'center'}>
        {isSignUp ? "Signup" : "Login"}
        </Typography>

        <form onSubmit={handleSubmit}>
            <Box display={'flex'} justifyContent={'center'} flexDirection={'column'}
            width={400} margin={'auto'} alignContent={'center'} padding={6}>

                {
                 !isAdmin && isSignUp &&
                     <>
                 <FormLabel>Name</FormLabel>   
                 <TextField sx={{mb:2}} margin='normal' variant='outlined'
                  type='text' name='name' value={inputs.name} onChange={handleChange}/>
                     </>
                }
                 
                 <FormLabel>Email</FormLabel>   
                 <TextField  margin='normal' variant='outlined'
                  type='email' name='email' value={inputs.email}  onChange={handleChange}/>
                 
                 <FormLabel sx={{mt:1, mb:1}}>Password</FormLabel>  
                 <TextField  margin='normal' variant='outlined' 
                 type='password' name='password' value={inputs.password}  onChange={handleChange}/>

                 <Button sx={{mt:2,borderRadius:10}} variant='contained'
                  type='submit'>
                 {isSignUp ? "Signup" : "Login"}   
                 </Button>   

                 { !isAdmin &&
                    <Button onClick={()=> setIsSignUp(!isSignUp)} sx={{mt:2,borderRadius:10}}>
                  Switch to {isSignUp ? "Login" : "Signup"}</Button>
                  
                  }  
            </Box>
        </form>

    </Dialog>
  )
}

export default AuthForm
