import React,{useState,useEffect} from 'react'
import classes from './Avatar.module.css'
import axios from 'axios'
import { Buffer } from 'buffer'
import {useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import customLoader from '../assets/loader.gif'
const Avatar = () => {
    const api=process.env.REACT_APP_AVATAR_API;
    const [avatar,setAvatar]=useState([])
    const [loader,setLoader]=useState(true)
    const [selectAvatar,setSelectAvatar]=useState(undefined)
    const [error,setError]=useState(false)
    const navigate=useNavigate()
useEffect(()=>{
    let arr=[]
    const fetchAvatar=async()=>{
        try{
            for(let i=0;i<4;i++){
                const image =await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                    const buffer = new Buffer(image.data);
                    arr.push(buffer.toString("base64"));
            }
        }
        catch(err){
            setError(true)
            console.error(err)
            toast.error("Something wents wrong")
        }
    }
        fetchAvatar().then(()=>{

        setLoader(false)
        })
        setAvatar(arr)
},[api])
    // console.log(avatar)
    const avatarSelectionHandler=()=>{
        if(selectAvatar===undefined){
            toast.error("Please select an avatar")
            return
        }
        else{
            localStorage.setItem("isAvatar",JSON.stringify(true))
        const d=avatar[selectAvatar]
            const res=axios.post(`${process.env.REACT_APP_BACKEND_CONN}/user/avatar`,{email:JSON.parse(localStorage.getItem("email")),avatar:`data:image/svg+xml;base64,${d}`},{
                withCredentials:true
            })
            res.then((res)=>{
                toast.success(res.data.message)
                navigate('/')
            }).catch((err)=>{
                // console.log(err)
                toast.error(err.response.data.message)
            })
        }
        }
    
    const content=
    <>
        <h1>Select Avatar</h1>
        <div className={classes.avatarContainer}>
            {avatar.map((item,index)=>{
                return <div className={`${classes.avatar} ${(selectAvatar===index)?classes.selected:""}`} key={index} onClick={()=>setSelectAvatar(index)}>
                    <img src={`data:image/svg+xml;base64,${item}`} alt="avatar"/>
                </div>
            })}
        </div>
        <button onClick={avatarSelectionHandler}  className={classes.btn} >Select</button>
        
    </>
   
    return (
    <>
        <div className={classes.avatarsPage}>
            {
                (loader||error)?<div className={classes.loader}>
                    <img src={customLoader} alt="CustomLoader" />
                </div>:content
            }
        </div>
        <ToastContainer theme='dark'/>
    </>
  )
}

export default Avatar