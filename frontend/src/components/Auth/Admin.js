import React from 'react'
import AuthForm from './AuthForm'
import { sendAdminAuth } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';
import { useNavigate } from 'react-router-dom';


const Admin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const responseReceived = (data)=>{
      console.log(data);
      dispatch(adminActions.login())
      localStorage.setItem("adminId", data.id)
      localStorage.setItem('token', data.token)
      navigate('/')
  }

  const getData = (data)=>{
    console.log("Admin", data);
    sendAdminAuth(data.inputs)
    .then(responseReceived)
    .catch((err)=>console.log(err))
  }

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin
