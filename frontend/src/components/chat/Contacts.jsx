import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Contacts.module.css";
import cookies from 'react-cookies'
import logo from "../../assets/chat.png"; 
import { ToastContainer,toast } from "react-toastify";
const Contacts = (props) => {
const [other,setOther]=useState([])
const [me,setMe]=useState({
    name:"",
    avatar:"",
    email:""
})
const navigate=useNavigate()
useEffect(() => {
    const email=JSON.parse(localStorage?.getItem('email'))
    const otherUsers=props?.data?.filter((user)=>{
        return user.email!==email
        })
    setOther(otherUsers)
    const self=props?.data?.filter((user)=>{
        return user.email===email
    })
    setMe({
        name:self[0]?.name,
        avatar:self[0]?.avatar,
        email:self[0]?.email
    })
    // console.log("me ",me[0].avatar)
}, [props.data])
const content = (
  <div className={classes.other}>
    {other?.map((user) => (
      <div
        style={{
          backgroundColor: props.userSlection === user._id ? "rgb(135,116,225)" : ""
        }}
        className={classes.user}
        onClick={() => {
          props.setUserSelection(user._id);
        }}
        key={user._id}
      >
        <div className={classes.userImg}>
          <img src={user?.avatar} height="55px" style={{ borderRadius: "55px" }} alt={user.name} />
        </div>
        <h3 className={classes.userName}>{user.name}</h3>
      </div>
    ))}
  </div>
);
props.setCurrentName(me.name);
  // console.log(props.userSelection)
  return (
    <>
    <div className={classes.cover}>
    <div className={classes.contactHeader}>
      <img src={logo} width="50px" alt="logo" />
      <h3>LetsChat</h3>
    </div>
      {
        content
      }
    </div>
    <div className={classes.prof}>
      <div className={classes.me}>
            <div className={classes.userImg}>
                <img src={me.avatar} height="80px" alt={me.name} />
            </div>
            <h3 className={classes.userName}>{(me.name.length>12)?me.name.substring(0,12)+" ...":me.name}</h3>
      </div>
      <div className={classes.feature}>
          <button onClick={()=>{navigate('/avatar')}}>Change Avatar</button>
          <button onClick={()=>{toast.info("This section is under development")}} >Payment</button>
          <button onClick={()=>{cookies.remove("jwt")}}>Logout</button>
      </div>
      </div> 
      <ToastContainer theme="dark"/>
    </>
  );
};

export default Contacts;
