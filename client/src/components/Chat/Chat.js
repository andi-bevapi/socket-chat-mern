import "./Chat.css";
import Infobar from "../Infobar/Infobar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSearchParams } from 'react-router-dom';


const ENDPOINT = "http://localhost:8080";
let socket;

const Chat = () => {
  
  const [searchParams] = useSearchParams();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  const currentParams = Object.fromEntries([...searchParams]);

  useEffect(() =>{
    socket = io(ENDPOINT);
    
    socket.emit("join",{name:currentParams.name,room:currentParams.room},()=>{});

    return ()=>{
      socket.off();
    }

  },[searchParams]);

  useEffect(()=>{

    socket.on('message', params => {

      // console.log("useEffect----params",params);
      setMessages([...messages,params]);
    });
    socket.on("roomData", ({ users }) => {
      console.log("useEffect----users",users);
      setUsers(users);
    });



  },[message]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

  const handleKey = (event)=>{
    if(event.key=== "Enter"){
      sendMessage(event);
    }
    return null
  }

  const sendMessage = (event) =>{
    event.preventDefault();

    if(message){
      socket.emit("sendMessage",message,()=>{ 
        setMessage('');
      })
    }
  }

  console.log("messages-----",messages);
  
  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar room={currentParams.room}/>
        <Messages messages={messages} name={currentParams.name}/>
        <Input message={message} handleChange={handleChange} handleKey={handleKey} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users}/>
    </div>
  );
};

export default Chat;
