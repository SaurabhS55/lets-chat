import React from 'react'
import classes from './ChatContainer.module.css'
import ChatHeader from './ChatHeader'
const ChatContainer = (props) => {
    const cuser=props.data.filter((u)=>{
        return u._id===props.userSelection
    })
console.log(cuser)
  return (
    <div className={classes.chatContainer}>
        <div className={classes.chatHeader}>
            <ChatHeader cuser={cuser}/>
        </div>
        <div className={classes.chatBody}>
        </div>
        {/* <div className={classes.chatFooter}> */}


    </div>
  )
}

export default ChatContainer