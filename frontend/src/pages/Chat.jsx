import React, { useEffect, useState } from "react";
import axios from "axios";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import classes from "./Chat.module.css";
import Contacts from "../components/chat/Contacts";
import chatBot from "../assets/robot.gif";
import ChatContainer from "../components/chat/ChatContainer";
const Chat = () => {
  const [session, setSession] = useState(true);
  const [userSlection, setUserSelection] = useState(undefined);
  const [currentName, setCurrentName] = useState("");
  const loaderData = useLoaderData();

  console.log(loaderData.users)
  setInterval(() => {
    setSession(!session);
  }, 10000);
  const navigate = useNavigate();
  useEffect(() => {
    const res = axios.get("http://localhost:5000/user/", {
      withCredentials: true,
    });
    res
      .then((res) => {
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [ session,navigate]);
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
          setCurrentName={setCurrentName}
          userSlection={userSlection}
          data={loaderData.users}
        />
      </div>
      <div className={classes.chatContainer}>
        {userSlection === undefined ? (
          defaultChat
        ) : (
          <ChatContainer userSelection={userSlection} data={loaderData.users} />
        )}
      </div>
    </div>
  );
};

export default Chat;
export const chatLoader = async () => {
  const res = await axios.get("http://localhost:5000/user/users", {
    withCredentials: true,
  });
  // if(!res.status===200){
  //   throw new Error("Something wents wrong")
  // }
  // console.log(json(res.data))
  return json(res.data);
};
