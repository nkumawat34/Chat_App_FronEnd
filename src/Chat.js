import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ENDPOINT = "https://chat-app-backend-15k0.onrender.com/";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([])
  const [socketid,setSocketId]=useState("");
  const [id,setId]=useState('')
  const [room,setRoom]=useState('')
  useEffect(() => {
    const newSocket = io(ENDPOINT, { transports: ['websocket'] });
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

  return (
    <div className='text-center'>
      Socket ID {socketid}
      <h1>Chat Room</h1>
      <div >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className='btn btn-primary m-4 px-4'>Send</button>
        </form>
        <div>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room name..."
          />
          <button onClick={handleJoinRoom} className='btn btn-primary m-4'>Join Room</button>
        </div>
        <input onChange={(e)=>setId(e.target.value)}  placeholder="ID"></input>
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
