import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Join() {

    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
  return (
    <div style={{marginTop:"20%"}}>
        <div className='text-center m-4'>Join</div>
        <div className='text-center mt-4'>
       <div>Name <input onChange={(event)=>setName(event.target.value)}></input>
       </div> 
       <div style={{marginTop:"2vh"}}>Room<input onChange={(event)=>setRoom(event.target.value)}></input>
        </div>
        <div className='text-center' style={{marginTop:"3vh"}}><Link onClick={event=>(!name || !room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}><button>Sign in</button></Link></div>
        </div> </div>
  )
}
