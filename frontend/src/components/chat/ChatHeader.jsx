import React from 'react'
import classes from './ChatHeader.module.css'
const ChatHeader = ({cuser}) => {
  return (
    <>
        <div className={classes.userImg}>
            <img src={cuser.avatar} height="55px" style={{ borderRadius: "55px" }} alt={cuser.name} />
        </div>
        <h3 className={classes.userName}>{cuser.name}</h3>
    </>
  )
}

export default ChatHeader