import { Avatar, Button, Alert } from '@mui/material'
import React, {useState} from 'react'
import Navigation from '../components/Navigation.js'
import bg from '../images/jovith.jpg'
import {Link, useNavigate} from 'react-router-dom';
import Plus from '@mui/icons-material/Add'
import '../css/styles.css'
import {signup} from '../utils/routes.js'
import axios from 'axios';
export default function Signup() {
    const [image, setImage] = useState(null);
    const [uploading, setUploadIng] = useState(false);
    const navigate = useNavigate()
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })
    const getValues = (e) =>{
        setValues({...values, [e.target.name]: e.target.value})
       
    }
    const [preview, setPreview] = useState(null)
    const getPhoto = (e) =>{
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file))
        setImage(file);
    }
    const uploadImage = async() =>{
        const data = new FormData();
        data.append('file' , image);
        data.append('upload_preset', 'napfr39w');
    try{
    if(image === null) return '';
        setUploadIng(true);
        let res = await fetch('https://api.cloudinary.com/v1_1/doubfwhsl/image/upload', {
          method: 'post',
          body: data
      });
      const urlData = await res.json();
      setUploadIng(false)
      return urlData.url;
    }catch(error){
        setUploadIng(false)
        console.log(error)
    }
    }
    const [err, setErr] = useState(null)
    const handleSignup = async(e)=>{
        e.preventDefault();
        const url = await uploadImage(image);
        const user = await axios.post(`${signup}`, {...values, url});
        const response = user.data;
        if(response.status === 'blocked') return setErr(response.msg);
        if(response.status === 'allowed'){
            console.log(response)
        localStorage.setItem('chat', JSON.stringify(response.user))
        navigate('/chat')
    }
    }
    return (
    <div>
    <Navigation />
  <div className="flex items-center justify-center pt-20 space-around">
      <form onSubmit={handleSignup} className="flex thecoder bg-white shadow drop-shadow-2xl px-16 h-[85vh] flex-col gap-3 w-[65vh] py-5 justify-center">
              <h1 className="text-2xl font-semibold text-center w-full">Create acccount</h1> 
              <div className="w-[100px] h-[100px] mx-auto relative">
                  {preview !== null ? <div className="overflow-hidden max-h-[100px]  rounded-full max-w-[100px]"><img src={preview} alt="preview" className="rounded-full"/></div> :<Avatar sx={{height: '90px', width: '90px'}} className="w-[100px] rounded-full text-2xl"/>}
                  <label htmlFor="image-upload" className="image-upload-label"><Plus sx={{height: '30px', width: '30px'}} className="bg-[green] absolute right-[8px] bottom-0 rounded-full text-white cursor-pointer z-[99]"/></label>
                  <input name="photo" type="file" onChange={getPhoto} hidden accept='image/*' id="image-upload" />
              </div>
              {err !==null ? <Alert color="error" className="animate-bounce">{err}</Alert> : <div className="h-12"></div>}
              <div className="flex flex-col items-start gap-2">
              <span className="text-xl font-[400]">Name</span>
              <div className="flex flex-col">
                  <input onChange={getValues} type="text" className="rounded-md p-4 w-[50vh] shadow-md border-2 border-solid border-[#8080807f] outline-none h-10" name="name" placeholder="Enter your email address"/>
              </div>
          </div>
          <div className="flex flex-col items-start gap-2">
              <span className="text-xl font-[400]">Email address</span>
              <div className="flex flex-col">
                  <input onChange={getValues} type="text" className="rounded-md p-4 w-[50vh] shadow-md border-2 border-solid border-[#8080807f] outline-none h-10" name="email" placeholder="Enter your email address"/>
                  <span className="text-gray-400 text-sm">We'll never share your email with anyone else.</span>
              </div>
          </div>
          <div className="flex flex-col items-start gap-2">   
              <span className="text-xl font-[400]">Password</span>
              <input onChange={getValues} autoComplete="off" type="password" className="rounded-md p-4 w-[50vh] shadow-md border-2 border-solid border-[#8080807f] outline-none h-10" name="password" placeholder="Enter your password"/>
          </div>
          <Button type="submit" className="bg-[blue] w-fit px-4" variant="contained">{!uploading ? 'Signup' : 'Signing you up'}</Button>
          <div className="mt-[10px]">Already have an account ? <Link to="/login" className="text-[blue] hover:underline">Login</Link></div>
      </form>
      <img src={bg} className="h-[85vh] w-[85vh]" alt="login"/>
  </div>
</div>
  )
}
