import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuth } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import { useNavigate } from 'react-router-dom';


const Auth = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const responseReceived = (data)=>{
    console.log(data);
    dispatch(userActions.login())
    localStorage.setItem('userId',data.id)
    navigate('/')
  }

  const getData = (data)=>{
    console.log("auth",  data);
    sendUserAuth(data.inputs,data.signUp)
    .then(responseReceived)
    .catch((err)=>console.log(err))
  }
  

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth
