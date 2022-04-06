import React, { useEffect } from 'react'
import MessagesForm from '../components/MessagesForm.js'
import Navigation from '../components/Navigation.js'
import Sidebar from '../components/Sidebar.js'
import {useNavigate} from 'react-router-dom'
function Chat() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('chat') === null || localStorage.getItem('chat') === 'undefined'){
      navigate('/login')
    }
  })
  return (
    <>
        <Navigation />
    <div className="flex justify-center items-center h-[100vh]">
        <div className="flex justify-center items-center h-[70vh] gap-12">
          <Sidebar />
          <MessagesForm />
        </div>
    </div>
    </>
  )
}

export default Chat