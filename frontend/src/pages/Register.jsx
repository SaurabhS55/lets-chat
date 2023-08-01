import React, { useState } from 'react'
import { Link, json,redirect } from 'react-router-dom'
import logo from '../assets/chat.png'
import classes from './Register.module.css'
import {ToastContainer,toast} from 'react-toastify'
import { useSubmit } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [register,setRegister]=useState({
        name:'',
        email:'',
        password:'',
        passwordConfirm:'',
    })
    const submit=useSubmit()
    const handleChange=(e)=>{
        setRegister({...register,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(handleValidation()){
            // console.log(register)
            submit(register,{method:"POST"})
        }
    }
    const handleValidation=(e)=>{
        if(register.name.trim().length===0){
            toast.error('Invalid Name')
            return false;
        }
        else if(register.email.trim().length===0&&(!register.email.trim().includes('@'))){
            toast.error('Invalid Email')
            return false;
        }
        else if(register.password.trim().length<6){
            toast.error('Invalid Password')
            return false;
        }
        else if(register.passwordConfirm.length<6){
            toast.error('Invalid Password Confirm')
            return false;
        }
        else if(register.password!==register.passwordConfirm){
            toast.error('Password and Confirm Password must be same')
            return false;
        }
        return true;
    }

  return (
    <>
        <div className={classes.container}>
            <div className={classes.brand}>
                <img src={logo} alt="logo" />
                <h1>Register</h1>
            </div>
            <form className={classes.register} onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" placeholder="Enter your name" onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" onChange={handleChange} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" onChange={handleChange} />
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm your password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            <section className={classes.already}>
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
            </section>
        </div>
        <ToastContainer theme='dark'/>
    </>
  )
}

export default Register
export const registerAction=async ({request,params})=>{
    const data=await request.formData()
    const obj={
        name:data.get('name'),
        email:data.get('email'),
        password:data.get('password')
    }
    try{
    console.log("Inside action ",obj)
    const res=await axios.post('https://letschat-yr3v.onrender.com/user/register',obj,{
        withCredentials:true
    });
    console.log(res.data);
    if(!res===200){
       throw new Error('Registration failed')
    }
    else{
        toast.success('Successfully Registered !!!')
    }
}
catch(err){
    toast.error(err.response.data.message)
    return json({status:502, message:"Registration failed"})    
}
 return redirect('/login')
}