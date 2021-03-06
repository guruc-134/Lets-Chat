import { Avatar } from '@material-ui/core';
import {useState ,useEffect} from 'react';
import React from 'react'
import './SidebarChat.css';
import db from '../../firebase';
import {Link} from 'react-router-dom';


function SidebarChat({addNewChat,id,sprites = 'avataaars',name}) {
    const [seed,setSeed] = useState('');
    const [messages,setMessages] = useState([])

    useEffect( ()=>
    {
        if(id)
        {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc')
            .onSnapshot(snapshot =>
                {
                    setMessages(snapshot.docs.map((doc)=>doc.data()))
                })
        }
    },[id])
    useEffect( () =>
    {
        setSeed(Math.floor(Math.random()*5000));
    },[])


    const createChat = () =>
    {
        const roomName = prompt("enter a room name")
        if(roomName)
        {
            db.collection('rooms').add({name:roomName,})
        }
    }
    return !addNewChat ?(
        <Link to ={`/rooms/${id}`}>
        <div className='sidebarChat'>
            <Avatar src ={`https://avatars.dicebear.com/api/${sprites}/${seed}.svg`}/>
            <div className = 'sidebarChat__info'>
                <h2>{name}</h2>
                <p>{messages[0]?.message.slice(0,23)+"..."}</p>
            </div>
        </div>
    </Link>
    ):
    (
        <div onClick = {createChat}
        className='sidebarChat'>
            <h2> Add new Chat</h2>
        </div>
    )
}

export default SidebarChat


// ask sprites and nickname from the user