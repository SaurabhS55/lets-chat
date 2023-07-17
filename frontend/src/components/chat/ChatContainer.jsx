import React from "react";
import classes from "./ChatContainer.module.css";
import ChatHeader from "./ChatHeader";
import { BsEmojiSmile } from "react-icons/bs";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import {v4 as uuidv4} from "uuid"
import axios from "axios";
// import { Socket } from "socket.io-client";
const ChatContainer = (props) => {
  const [emojiPickerState, setEmojiPickerState] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [chat, setChat] = React.useState([]);
  const [isValidMessage, setIsValidMessage] = React.useState(false);
  const [arrivalMessage, setArrivalMessage] = React.useState(null);
  const scrollRef = React.useRef();
  // console.log(cuser)
  const changeHandler = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim().length > 0) {
      setIsValidMessage(true);
    } else {
      setIsValidMessage(false);
    }
  };
  // ...

React.useEffect(() => {
  if (props.currentChat === undefined) return;
    const obj = {
      from: props.senderId,
      to: props.data._id,
    };

    try {
      const res =axios.post(
        "http://localhost:5000/message/receive",
        obj,
        { withCredentials: true }
      );
        console.log(res.data);
      setChat(res.data);
    } catch (err) {
      console.log(err);
    }
}, [props.senderId, props.data._id, props.currentChat]);

// ...

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setMessage((prevMessage) => {
      if ((prevMessage + emoji).trim().length > 0) {
        setIsValidMessage(true);
        return prevMessage + emoji;
      } else {
        setIsValidMessage(false);
        return prevMessage;
      }
    });
  };
  const messageHandler = (e) => {
    e.preventDefault();

    // console.log(data)
    const res = axios.post(
      "http://localhost:5000/message/send",
      {
        from: props.senderId,
        to: props.data._id,
        message: message,
      },
      { withCredentials: true }
    );
    res
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    props.socket.current.emit("send-msg", {
      from: props.senderId,
      to: props.data._id,
      message: message,
    });
    const m=[...chat]
    m.push({fromSelf:true,message:message})
    setChat(m)
    // setMessage("");
    // setIsValidMessage(false);
  };
  React.useEffect(() => {
    if(props.socket.current){
      props.socket.current.on("recieve-msg", (data) => {
        // console.log(data);
        setArrivalMessage({fromSelf:false,message:data});
      });
    }
  }, []);
  React.useEffect(() => {
      arrivalMessage&&setChat((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);


  return (
    <div className={classes.chatContainer}>
      <div
        className={classes.chatHeader}
        onClick={() => {
          setEmojiPickerState(false);
        }}
      >
        <ChatHeader cuser={props.data} />
      </div>
      <div className={classes.chatBody}>
        {/* console.log(chat[0].id) */}
        {chat.map((message) => (
            <div ref={scrollRef} key={uuidv4()}>
              <div className={`${classes.message}`} style={{justifyContent:(message.fromSelf)?"end":"start"}}>
                <div className={classes.content} style={{backgroundColor:(message.fromSelf)?"rgb(126,109,209)":"rgb(69, 68, 68)"}}>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
        ))}
      </div>
      <div className={classes.chatFooter}>
        <div className={classes.emojji}>
          <BsEmojiSmile
            size="2rem"
            onClick={() => {
              setEmojiPickerState(!emojiPickerState);
            }}
          />
          {emojiPickerState && (
            <div className={classes.emojiPicker}>
              <EmojiPicker
                theme="dark"
                emojiStyle="apple"
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}
        </div>
        <form onSubmit={messageHandler} className={classes.formip}>
          <div className={classes.input}>
            <input
              type="text"
              placeholder="Type a message"
              onClick={() => {
                setEmojiPickerState(false);
              }}
              onChange={changeHandler}
              value={message}
            />
          </div>
          <div className={classes.send}>
            {isValidMessage && (
              <button>
                <RiSendPlane2Fill size="2rem" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
