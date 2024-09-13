import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ENDPOINT = "https://chat-app-backend-15k0.onrender.com";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([])
  const [socketid,setSocketId]=useState("");
  const [id,setId]=useState('')
  const [room,setRoom]=useState('')
  const location = useLocation();
  const email =location.state.email
 const navigate=useNavigate()
  useEffect(() => {
    
    const token = localStorage.getItem('token'+email);
    
    const newSocket = io(ENDPOINT, { transports: ['websocket'],   auth: {
      token: token
  } },
      
    );
    setSocket(newSocket);
    
    newSocket.on('connect', () => {
      console.log('Connected to the server');
      setSocketId(newSocket.id)
    });

    newSocket.on("received-message", (message) => {
      console.log("Received message:", message);
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (socket && message) {
      
      socket.emit("message", { message, room });
      setMessage("");
    } else {
      console.log("Please enter message and room name.");
    }
  };
  const sendwithid=()=>{

   socket.emit("single",{message,id})
  }
  const handleJoinRoom = () => {

    setRoom(roomName)
    if (socket && roomName) {
      socket.emit("join-room", roomName);
      setRoomName('');
    } else {
      console.log("Please enter a room name.");
    }
  };
  const handleLogout = () => {
 
    localStorage.removeItem('token'+email);
    navigate("/")
   
  };
  return (
    <div className='text-center'>
      
      <button className="m-4 btn btn-danger" onClick={handleLogout} style={{float:"right"}} >Logout</button>
    Socket ID <strong>{socketid}  </strong> 
      <h1 className='mt-5 text-3xl'>Chat Room</h1>
      <div >
        <form onSubmit={handleSubmit} className='mr-[32px]'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..." style={{marginLeft:""}}
            className='border-2 border-slate-950'
          />
          <button type="submit" className='btn btn-primary ms-4 px-4 my-4'>Send</button>
        </form>
        <div>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room name..."
            className='border-2 border-slate-950'
          />
          <button onClick={handleJoinRoom} className='btn btn-primary m-4'>Join Room</button>
        </div>
        <input onChange={(e)=>setId(e.target.value)}  placeholder="ID" className='border-2 border-slate-950'></input>
        <button onClick={sendwithid} className='btn btn-primary m-3'>  Send with ID</button>
        <div>
          {messages.map((msg, index) => (
            <div key={index} style={{fontFamily:"fantasy"}} className='mt-2'>{msg}</div>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default Chat;
