import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading';
export default function Join() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()
    const handleinput=()=>{

      if(!email || !password)
          return ;
      setLoading(true)
      axios.post('https://chat-app-backend-15k0.onrender.com/login', {
        email: email,
        password: password
      })
      .then((response) => {
        const token = response.data.data.token;
      
        // Store the token in localStorage with a key specific to the user's email
        localStorage.setItem('token_' + email, token);
        setLoading(false)
        // Navigate to the chat page, passing the email as state
        navigate("/chat", { state: { email: email } });
      })
      .catch((error) => {
        setLoading(false)
        alert("User authentication failed");
        
        console.error("Login error:", error);
      });
      setLoading(false)
    }      
  return (
    <div style={{marginTop:"15%"}}>
        <div className='text-center m-3 text-3xl'>Join</div>
        <div className='text-center'>
       <div>Email <input onChange={(event)=>setEmail(event.target.value)} className='ms-3 border-2 border-slate-950'></input>
       </div> 
       <div style={{marginTop:"2vh"}}>Password<input  type="password" className='mx-1 border-2 border-slate-950' onChange={(event)=>setPassword(event.target.value)}></input>
        </div>
        <div className='text-center ' style={{marginTop:"3vh"}}><button className='btn btn-primary mx-4' onClick={handleinput}>Sign in</button>
       <Link to={'/signup'}> <button className='mx-4 btn btn-primary'>Sign up</button>  </Link>   
       {loading? <div className='flex justify-center'><ReactLoading color={"red"} height={100} width={100} /></div>:""}
        </div>
        
        </div>
       
         </div>
  )
}
