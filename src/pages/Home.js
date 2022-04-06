import React from 'react'
import Navigation from '../components/Navigation.js'
import Button from '@mui/material/Button';
import TwoComments from '@mui/icons-material/CommentTwoTone'
import bg from '../images/jovith.jpg'
import {Link} from 'react-router-dom'
function Home() {
  return (
    <div>
        <Navigation />
        <div className="flex pt-20 bg-white items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-5">
                <div>
                    <h1 className="text-3xl font-bold">Share the world with your friends</h1>
                    <h4>Chat app lets you connect with the world.</h4>
                </div>
                <Button variant="contained" color='success'><Link to='/chat'>GetStarted<TwoComments /></Link></Button>
            </div>
            <img src={bg} className="h-[70%] thecoder w-30" alt="home"/>
        </div>
    </div>
  )
}

export default Home