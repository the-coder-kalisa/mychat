import { Button, Alert } from '@mui/material'
import React, {useState, useContext, useEffect} from 'react'
import Navigation from '../components/Navigation.js'
import bg from '../images/jovith.jpg';
import {login} from '../utils/routes.js';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import {AppContext} from '../context/appContext.js'
function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const getValues = (e) =>{
        setValues({...values, [e.target.name]: e.target.value})
    }
    const [err, setErr] = useState(null);
    const {socket} = useContext(AppContext)
    const handlelogin = async(e)=>{
        e.preventDefault();
        const logedIn = await axios.post(login, values);
        const response = logedIn.data;
        socket.emit('new-user')
        if(response.status === 'blocked') return setErr(response.msg);
        localStorage.setItem('chat', JSON.stringify(response.user[0]));
        navigate('/chat');
    }
  return (
      <>
          <Navigation />
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex items-center justify-center pt-20 space-around">
            <img src={bg} className="h-[67vh] w-[70vh]" alt="signup"/>
            <form onSubmit={handlelogin} className="flex bg-white shadow drop-shadow-2xl px-16 h-[67vh] flex-col gap-3 w-[500px] justify-center">
                {err !==null ? <Alert color="error" className={'animate-bounce'}>{err}</Alert> : <div className="h-12"></div>}
                <div className="flex flex-col items-start gap-2">
                    <span className="text-xl font-[400]">Email address</span>
                    <div className="flex flex-col">
                        <input onChange={getValues} type="text" className="rounded-md p-4 w-[400px] shadow-md border-2 border-solid border-[#8080807f] outline-none h-10" name="email" placeholder="Enter your email address" required/>
                        <span className="text-gray-400 text-sm">We'll never share your email with anyone else.</span>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2">   
                    <span className="text-xl font-[400]">Password</span>
                    <input onChange={getValues} type="password" autoComplete="off" className="rounded-md p-4 w-[400px] shadow-md border-2 border-solid border-[#8080807f] outline-none h-10" name="password" placeholder="Enter your password" required/>
                </div>
                <Button type="submit" className="bg-[blue] w-12" variant="contained">Login</Button>
                <div>Don't have an account ? <Link to="/signup" className="text-[blue] hover:underline">signup</Link></div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login