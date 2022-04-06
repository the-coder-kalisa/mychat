import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {useState} from 'react';
import Home from './pages/Home.js'
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Chat from './pages/Chat.js';
import {AppContext, socket} from './context/appContext.js'

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentroom] = useState('');
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessage, setNewMessage] = useState({})
  const user = localStorage.getItem('chat');
  return (
    <AppContext.Provider value={{socket, currentRoom, setCurrentroom, members, setMembers, messages, 
    setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessage, setNewMessage}}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
    </BrowserRouter>
     </AppContext.Provider>
  );
}

export default App;
