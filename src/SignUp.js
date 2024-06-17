import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function SignUp() {

    const [name,setName]=useState("")
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()
        function signup(){

            axios.post('https://chat-app-backend-15k0.onrender.com/signup',{
                name:name,
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
    <div className='text-center'>
        <h1 className='text-center'>Sign Up</h1>
        <div className='d-flex justify-content-center flex-column'>
        
        <div className='mt-4'><label className='mx-2'>Name</label><input onChange={(e)=>setName(e.target.value)} className='ms-4'></input></div>
        <div className='mt-4'><label className='mx-2'>Email</label><input onChange={(e)=>setEmail(e.target.value)} className='ms-4'></input ></div>
        <div className='mt-4'><label className='mx-2'>Password</label><input onChange={(e)=>setPassword(e.target.value)}></input></div>
        <div><button className='btn btn-primary mt-4' onClick={()=>signup()}>SignUp</button></div>
        </div>
    </div>
  )
}
