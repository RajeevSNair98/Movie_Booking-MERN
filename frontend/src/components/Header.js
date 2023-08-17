import React, { useEffect, useState } from 'react'
import {AppBar, Box, IconButton, Tab, Tabs, TextField, Toolbar} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import Autocomplete from '@mui/material/Autocomplete';
import {getAllMovies} from '../api-helpers/api-helpers'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';


const Header = () => {

    const isAdminLoggedIn = useSelector((state)=> state.admin.isLoggedIn)
    const isUserLoggedIn = useSelector((state)=> state.user.isLoggedIn)
    const [value,setValue] = useState()
    const [movies,setMovies] = useState([])

    useEffect(()=>{
        getAllMovies()
        .then((data)=> setMovies(data.movies))
        .catch((err)=>console.log(err))
    },[])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = (isAdmin)=>{
      dispatch(isAdmin?adminActions.logout():userActions.logout())
    }

    const handleChange = (e,value)=>{
        const movie = movies.find((m)=> m.title === value)
        if(isUserLoggedIn){
          navigate(`/booking/${movie._id}`)
        }
    }

  return (
    <AppBar position='sticky' sx={{bgcolor:'#2b2d42'}}>
      <Toolbar>

        <Box width={'20%'}>
          <IconButton LinkComponent={Link} to='/'>
          <MovieIcon/>
          </IconButton>  
        </Box>

        <Box width={'20%'} margin={'auto'}>
        <Autocomplete onChange={handleChange}
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => <TextField sx={{input:{color:"white"}}} variant='standard' {...params} placeholder="Search Movies" />}
      />
        </Box>

        <Box display={'flex'}>
            <Tabs textColor='white' indicatorColor='secondary' value={value} onChange={(e,value)=>setValue(value)}>
                <Tab LinkComponent={Link} to="/movies" label="Movies"/>

                {!isAdminLoggedIn && !isUserLoggedIn && <>
                     <Tab LinkComponent={Link} to="/admin"  label="Admin"/>
                     <Tab LinkComponent={Link} to="/auth"  label="Auth"/>
                </>}
                {isUserLoggedIn && 
                  <>
                   <Tab LinkComponent={Link} to="/user"  label="Profile"/>
                    <Tab  LinkComponent={Link} to="/" onClick={()=>logout(false)}  label="Logout"/>
                  </>
                }
                {isAdminLoggedIn && 
                  <>
                   <Tab LinkComponent={Link} to="/add"  label="Add Movie"/>
                   <Tab LinkComponent={Link} to="/user-admin"  label="Profile"/>
                    <Tab LinkComponent={Link} to="/" onClick={()=>logout(true)}   label="Logout"/>
                  </>
                }

               
            </Tabs>
        </Box>



      </Toolbar>
    </AppBar>
  )
}

export default Header
