
import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom';
export default function Chat(props) {

    const ENDPOINT="http://localhost:3000"
    const location = useLocation();
    const [name, setName] = useState('');
    
    const [socket, setSocket] = useState(null);
    const [message,SetMessage]=useState("")
    const [room,setRoom]=useState("")
    const [roomname,setRoomName]=useState("");
    const [socketid,setSocketId]=useState("")
    const [messages,setMessages]=useState([])
    const handleSubmit=(e)=>{

      
      socket.emit("message",{message,room})

    }
    const JoinSomeRoom=()=>{

      socket.emit("join-room",roomname)
      SetMessage('')
    }
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const name = searchParams.get('name');
      const room = searchParams.get('room');
  
      setName(name);
      setRoom(room);
  
      const newSocket = io(ENDPOINT, { transports: ['websocket'] });
      setSocket(newSocket);
      newSocket.on('connect', () => {
        console.log('Connected to the server');
        setSocketId(newSocket.id);
      alert(newSocket.id)
        if (name && room) {
          newSocket.emit('join', { name, room });
        }
      });
      newSocket.on("received-message",(message)=>{

        console.log(message)
        setMessages((messages)=>[...messages,message]);
        alert(message)

      })
      setSocket(newSocket);
  
      return () => {
        newSocket.disconnect();
      };
    }, [location.search, name]);
  return (
    
    <div style={{marginTop:"30vh",marginLeft:"30vw"}}>
      <h1 style={{marginLeft:"10vw"}}>Chat App</h1>
     <h3 > Socket ID: {socketid!=""?socketid:""}</h3>
      Welcome to my chat App
      <input onChange={(e)=>SetMessage(e.target.value)} style={{marginLeft:"6vw"}}></input>
      <hr/>
    Room Name<input onChange={(e)=>setRoomName(e.target.value)} style={{marginLeft:"12vw"}}></input>  
    <button onClick={()=>JoinSomeRoom()} class="btn btn-primary" style={{marginLeft:"2vw"}} >Join Now</button>
    <hr/>
    Room <input style={{marginLeft:"15vw"}} onChange={(e)=>setRoom(e.target.value)}></input>
    <button type="submit" class="btn btn-primary" onClick={()=>handleSubmit()} style={{marginLeft:"2vw"}}>Send</button>
    
    {
      messages.length!=0?messages.map((message)=>{
        <>
          {message}
        </>
      }):""


    }
    </div>
  )
}
