import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../context/appContext.js';
import { Avatar } from '@mui/material';
import {Circle} from '@mui/icons-material'
function Sidebar() {
    const {socket, currentRoom, setCurrentroom, members, rooms, setMembers, messages, 
    setMessages, privateMemberMsg, setPrivateMemberMsg, setRooms, newMessage, setNewMessage} = useContext(AppContext);
    const user = JSON.parse(localStorage.getItem('chat'));
    const final = [];
    socket.off('new-user').on('new-user', (payload)=>{
      if(user !== null){
      for(let i=0; i<payload.length; i++) {
        if(payload[i]._id === user._id){
          continue;
        }
        final.push(payload[i]);
      }
      setMembers(final)
    }
    });
      const joinRoom = (room, isPublic = true)=>{
      socket.emit('join-room', room);
      setCurrentroom(room);
      if(isPublic){
        setPrivateMemberMsg(null);
      };
      
    } 
    const OrderIds = (id1, id2) =>{
      if(id1 > id2){
        return id1 + '-' + id2;
      } else{
        return id2 + '-' + id1;
      }
    }
    const handlePrivateMsg = (members) =>{
      setPrivateMemberMsg(members);
      setCurrentroom('');
      const roomId = OrderIds(user._id, members._id)
      joinRoom(roomId, false)
    }
    const getRooms = ()=>{
      fetch('http://localhost:5000/rooms')
      .then((res)=> res.json())
      .then((data)=> setRooms(data));
    };
     useEffect(()=>{
      if(user){
        setCurrentroom('general');
        getRooms();
        socket.emit('join-room', 'general');
        socket.emit('new-user');
        let nots = 0;
        socket.on('notification', (payload)=>{
          console.log(payload)
        });
      }
    },[]);
  return (
    <div className="h-[80%]">
        <h2 className="text-3xl pb-3 font-semibold">Available rooms</h2>
        <ul>
            {rooms.map((room, index)=>{
                return(
                <li key={index} onClick={()=> joinRoom(room)} className={`${room === currentRoom && 'bg-[green] text-white'} border-2 border-solid border-[gray] cursor-pointer flex justify-between p-2`}>
                  {room} {currentRoom !== room && <span></span>}
                </li>
                )
            })}
        </ul>
        <h2 className="text-3xl pt-3 font-semibold">Members</h2>
        <ul>
          {members.map((members, index)=>{
            return(
              <li key={index} onClick={()=>{handlePrivateMsg(members)}}  className={`${privateMemberMsg !== null && privateMemberMsg.name === members.name && 'bg-[#17179e] text-white'} flex items-center gap-2 border-2 cursor-pointer border-solid border-[gray] p-2`}>
                <div className='relative'>
                  {members.picture !== "" ? <div className="overflow-hidden max-h-[50px]  rounded-full max-w-[50px]" ><img src={members.picture} className="rounded-full" alt="profile"/></div> : <Avatar sx={{height: '38px', width: '38px'}}/>}
                  {members.status === 'online' && <Circle className='absolute right-0 -bottom-1' color='success' sx={{width: '15px', height: '15px'}}/>}
                </div>
                <span className="text-xl">{members.name}</span>
                {members.status === 'offline' && <span>(offline)</span>}
              </li>
            )
          })}
        </ul>
    </div>
  )
}

export default Sidebar