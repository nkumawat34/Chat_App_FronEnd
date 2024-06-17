import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Join() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()
    const handleinput=()=>{

      if(!email || !password)
          return ;

      axios.post('https://chat-app-backend-15k0.onrender.com/login',{
        email:email,
        password:password
      })
      .then((response) => {
       
        const token = response.data.data.token;
      localStorage.setItem('token'+email, token); // Store the token
        navigate("/chat",{state:{email:email}})
      }, (error) => {
        console.log(error);
      });
      
    }
  return (
    <div style={{marginTop:"15%"}}>
        <div className='text-center '>Join</div>
        <div className='text-center'>
       <div>Email <input onChange={(event)=>setEmail(event.target.value)} className='ms-3'></input>
       </div> 
       <div style={{marginTop:"2vh"}}>Password<input className='mx-1' onChange={(event)=>setPassword(event.target.value)}></input>
        </div>
        <div className='text-center ' style={{marginTop:"3vh"}}><button className='btn btn-primary mx-4' onClick={handleinput}>Sign in</button>
       <Link to={'/signup'}> <button className='mx-4 btn btn-primary'>Sign up</button>  </Link>   
        </div>
        </div> </div>
  )
}
