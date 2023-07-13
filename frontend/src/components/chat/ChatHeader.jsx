import React from 'react'
import classes from './ChatHeader.module.css'
const ChatHeader = ({cuser}) => {
  return (
    <>
        <div className={classes.userImg}>
            <img src={cuser[0].avatar} height="55px" style={{ borderRadius: "55px" }} alt={cuser[0].name} />
        </div>
        <h3 className={classes.userName}>{cuser[0].name}</h3>
    </>
  )
}

export default ChatHeader