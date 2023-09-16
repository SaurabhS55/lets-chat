import React, { useState } from 'react'
import { Link, useSubmit, redirect } from 'react-router-dom'
import logo from '../assets/chat.png'
import classes from './Login.module.css'
import { ToastContainer,toast } from 'react-toastify'
import axios from 'axios'
const Login = () => {
  const [login,setLogin]=useState({
    email:'',
    password:''
  })
  const submit=useSubmit()
  // console.log(process.env)
  const handleChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(login.email.trim().length===0 &&(!login.email.trim().includes('@'))){
      toast.error('Invalid Email')
    }
    else if(login.password.trim().length<6){
      toast.error('Invalid Password')
    }
    else{
      submit(login,{method:"POST"})
      setLogin({
        email:'',
        password:''
      })
    }
  }

  return (
    <>
        <div className={classes.container}>
            <div className={classes.brand}>
                <img src={logo} alt="logo" />
                <h1>Login</h1>
            </div>
            <form className={classes.login} onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" onChange={handleChange} value={login.email}/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" onChange={handleChange} value={login.password}/>
                <button type="submit">Login</button>
            </form>
            <section className={classes.already}>
                <p>Not have an account?</p>
                <Link to="/register">Register</Link>
            </section>
        </div>
        <ToastContainer theme='dark'/>
    </>
  )
}

export default Login

export const loginAction=async({request,params})=>{
  const data=await request.formData();
  // console.log(data)
  localStorage.setItem('email',JSON.stringify(data.get('email')))
  try{
    const res=await axios.post('http://localhost:5000/user/login',{
      'email':data.get('email'),
      'password':data.get('password')
    },{
      withCredentials:true
    })
    if(!res.status===200){
      throw new Error('User not found..')
    }
    else{
      toast.success('Login Successful')
      if(JSON.parse(localStorage.getItem('isAvatar'))){
        return redirect('/')
      }
      return redirect('/avatar');
    }
  }
  catch(err){
    toast.error(err.response.data.message)
  }
  return null;
}