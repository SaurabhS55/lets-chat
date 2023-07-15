import React from 'react'
import classes from './ChatContainer.module.css'
import ChatHeader from './ChatHeader'
import {BsEmojiSmile} from 'react-icons/bs'
import {RiSendPlane2Fill} from 'react-icons/ri'
import EmojiPicker from 'emoji-picker-react';
// import { useSelector,useDispatch } from 'react-redux';
// import { toggleEmoji } from '../../store/emojiSlice'
const ChatContainer = (props) => {
    // const dispatch = useDispatch()
    // const emojiPickerState=useSelector((state)=>state.emoji.emoji)
    const [emojiPickerState,setEmojiPickerState]=React.useState(false)
    const [message,setMessage]=React.useState("")
    const [isValidMessage,setIsValidMessage]=React.useState(false)
    const cuser=props.data.filter((u)=>{
        return u._id===props.userSelection
    })
// console.log(cuser)
const changeHandler=(e)=>{
    setMessage(e.target.value)
    if(e.target.value.trim().length>0){
        setIsValidMessage(true)
    }else{
        setIsValidMessage(false)
    }
}
const handleEmojiClick = (emojiObject) => {
  const emoji = emojiObject.emoji;
  setMessage((prevMessage) =>{
    if((prevMessage+emoji).trim().length>0){
        setIsValidMessage(true)
        return prevMessage+emoji
    }
    else{
        setIsValidMessage(false)
        return prevMessage
    }
  });
};
  return (
    <div className={classes.chatContainer}>
        <div className={classes.chatHeader} onClick={()=>{setEmojiPickerState(false)}} >
            <ChatHeader cuser={cuser}/>
        </div>
        <div className={classes.chatBody} onClick={()=>{setEmojiPickerState(false)}} >
                
        </div>
        <div className={classes.chatFooter}>
          <div className={classes.emojji}>
            <BsEmojiSmile size="2rem" onClick={()=>{
              setEmojiPickerState(!emojiPickerState)
            }} />
            {emojiPickerState&&
             <div className={classes.emojiPicker} >
              <EmojiPicker emojiStyle='apple'  onEmojiClick={handleEmojiClick}/>
            </div>
            }
          </div>
          <div className={classes.input}>
            <input type="text" placeholder="Type a message" onClick={()=>{setEmojiPickerState(false)}} onChange={changeHandler} value={message}/>
            </div>
          <div className={classes.send}>
            {isValidMessage&&<button>
              <RiSendPlane2Fill size="2rem" />
            </button>}
          </div>
        </div>
    </div>
  )
}

export default ChatContainer