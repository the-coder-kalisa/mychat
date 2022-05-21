import React, {useState} from 'react'
import {CommentTwoTone, Circle} from '@mui/icons-material';
import {Avatar, Button} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {logout} from '../utils/routes.js'
function Navigation() {
  const navigate = useNavigate();
  var user = undefined;
if(localStorage.getItem('chat') !== "undefined"){
  user = JSON.parse(localStorage.getItem('chat'));
}
  const [show, setShow] = useState("hidden")
  const notsearch = () =>{
    setShow("hidden")
}
const search = () =>{
    setShow("flex");
}
const handleLogout = async()=>{
  await axios.post(logout, user);
  localStorage.clear('chat');
  navigate('/')
};
  return (
    <div className="bg-[#ffffff] fixed w-full shadow-md z-50 drop-shadow-xl flex h-16 items-center  justify-between px-4">
        <Link to="/" className="text-blue-600">Chat app<CommentTwoTone /></Link>
        <div className="flex justify-center gap-5 items-center">
            {user === null && <Link to="/login">Login</Link>}
            <Link to="/chat">Chat</Link>
            {user !== null &&
            (
              <div className="relative cursor-pointer py-6" onMouseEnter={search} onMouseLeave={notsearch}>
                <div className='flex items-center gap-3'>
                  <div className="relative">
                    {user.picture !== "" ? <div className="overflow-hidden max-h-[50px]  rounded-full max-w-[50px]"><img src={user.picture} alt="profile"/></div> : <Avatar sx={{height: '38px', width: '38px'}}/>}
                   {user.status === 'online' && <Circle className='absolute right-0 -bottom-1' color='success' sx={{width: '15px', height: '15px'}}/>}
                  </div>
                  <span>{user.name}</span>
                </div>
                <ul className={`${show} flex flex-col items-start bg-white w-[200px] -right-4 mt-3 shodow-md rounded-md border-2 border-solid border-[#80808090] absolute`}>
                  <li className="hover:bg-[gray] px-3 py-2 w-full">Action</li>
                  <li className="hover:bg-[gray] px-3 py-2 w-full">Action</li>
                  <li className="hover:bg-[gray] px-3 py-2 w-full">Action</li>
                  <li className="hover:bg-[gray] px-3 py-2 w-full">Action</li>
                  <Button onClick={handleLogout} variant="contained" style={{margin: '5px 12px'}} className="text-white" color="error">Logout</Button>
                </ul>
              </div>
             )
            }
        </div>
    </div>
  )
}

export default Navigation