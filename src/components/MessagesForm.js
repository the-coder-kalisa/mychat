import { Button, Avatar } from '@mui/material';
import {Send} from '@mui/icons-material'
import React, {useContext, useState, useRef, useEffect} from 'react'
import {AppContext} from '../context/appContext.js'
function MessagesForm() {
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem('chat'));
  const {socket, currentRoom, setMessages, messages, privateMemberMsg} = useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(()=>{
    scrollToBottom();
  },[messages])
  const getFormattedDate = ()=>{
    const date = new Date();
    const year = date.getFullYear();
    let month = (date.getMonth()+1).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
  }
  const todayDate = getFormattedDate();
  const scrollToBottom = ()=>{
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }
  socket.off('room-messages').on('room-messages', (roomMessages)=>{
    setMessages(roomMessages);
  })

  const handleMsg = (e) =>{
    e.preventDefault();
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    if(message !== ""){
    socket.emit('message-room', roomId, message, user, time, todayDate);
    }
    setMessage("");
  }
  return (
    <div className="w-[80vh] border-x-2 rounded-lg shadow-md border-t-2 border-solid border-[#c8c8c8] h-full relative">
      {messages.length > 0 ? <div className="overflow-auto relative h-[63vh]">
        {messages.map(({_id, messagesByDate}, index)=>{
        return(
        <div key={index}>
          <p className="bg-[#1a9797] rounded-lg mb-5 text-white shadow-md drop-shadow-md shadow-[#000000b3] sticky z-40 w-[100%+100px] overflow-hidden top-0 h-12 justify-center flex items-center">{_id}</p>
          <div className="z-10">
          {messagesByDate?.map(({content, from: sender, time}, index)=>{
            console.log(sender._id);
            console.log(user._id)
           return(
             <div key={index} className={`${sender._id === user._id ? 'justify-end' : 'justify-start'} flex mb-3`}>
               <div className={`ml-[20px] message-inner mb-[10px] p-[10px] min-w-[200px] max-w-[90%] text-left min-h-[80px] font-[sans-serif] font-[500] text-[1rem] inline-block rounded-[10px] ${sender._id === user._id ? 'bg-[#ffdab9]' : 'bg-[#d1e7dd]'}`}>
                 <div className="flex gap-3 items-center mb-3">
                    {sender.picture !== "" ? <div className="overflow-hidden max-h-[50px] rounded-full max-w-[50px]"><img src={sender.picture} alt="profile"/></div> : <Avatar sx={{height: '38px', width: '38px'}}/>}
                   <p>{sender._id === user._id ? 'you' : sender.name}</p>
                 </div>
                 <p>{content}</p>
                 <p>{time}</p>
               </div>
             </div>
           )
          })}
          </div>
        </div>)
      })}
      <div ref={messageEndRef}></div>
      </div> :
       <div className="h-[65vh] w-[80vh] font-bold text-2 flex items-center justify-center">
         <span>Start new Conversation with your friends</span>
       </div>
      }
        <form onSubmit={handleMsg} className="flex w-[100%] justify-center gap-3 absolute bottom-0">
            <input autoFocus type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} className="border-2 border-solid border-gray-200 h-[40px] p-5 outline-none w-[88%]" placeholder="Your message"/>
            <Button type="submit" sx={{width: '10px', height: '40p'}} className="text-white rounded-md shadow-md border-3 border-solid border-gray-500" style={{background: '#f88901', width: '10px'}} variant="contained"><Send /></Button>   
        </form>
    </div>
  )
}

export default MessagesForm