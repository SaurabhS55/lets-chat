import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import classes from "./Chat.module.css";
import Contacts from "../components/chat/Contacts";
import chatBot from "../assets/robot.gif";
import ChatContainer from "../components/chat/ChatContainer";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef();
  const [session, setSession] = useState(0);
  const [userSlection, setUserSelection] = useState(undefined);
  const [currentName, setCurrentName] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);
  const [senderId, setSenderId] = useState(undefined);
  const loaderData = useLoaderData();

  // console.log(loaderData.users)
  setInterval(() => {
    setSession(session + 1);
  }, 10000);

  const navigate = useNavigate();
  useEffect(() => {
    const senderemail = JSON.parse(localStorage?.getItem("email"));
    const sender = loaderData.users?.filter((user) => {
      return user.email === senderemail;
    });
    const Id = sender[0]?._id;
    setCurrentName(sender[0]?.name);
    setSenderId(Id);
  }, [senderId, loaderData.users]);

  useEffect(() => {
    if (senderId){
      socket.current = io(process.env.BACKEND_CONN);
      socket.current.emit("add-user", senderId);
    }
  }, [senderId]);

  useEffect(() => {
    const res = axios.get("https://letschat-yr3v.onrender.com/user/", {
      withCredentials: true,
    });
    res
      .then((res) => {
        // console.log(res.data)
      })
      .catch((err) => {
        // console.log(err);
        navigate("/login");
      });
  }, [session, navigate]);

  const handleSelection = (id) => {
    setUserSelection(id);
  };
  
  const defaultChat = (
    <>
      <img src={chatBot} height="500px" alt="chatbot" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          color: "white",
        }}
      >
        <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Welcome, </p>
        <p
          style={{
            color: "rgb(135,116,225)",
            fontStyle: "italic",
            fontSize: "2rem",
          }}
        >
          {currentName}
        </p>
      </div>
    </>
  );
  return (
    <div className={classes.chat}>
      <div className={classes.contacts}>
        <Contacts
          setUserSelection={handleSelection}
          userSlection={userSlection}
          data={loaderData.users}
          setCurrentChat={setCurrentChat}
        />
      </div>
      <div className={classes.chatContainer}>
        {userSlection === undefined ? (
          defaultChat
        ) : (
          <ChatContainer
            userSelection={userSlection}
            data={currentChat}
            senderId={senderId}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
export const chatLoader = async () => {
  const res = await axios.get("https://letschat-yr3v.onrender.com/user/users", {
    withCredentials: true,
  });
  return json(res.data);
};
