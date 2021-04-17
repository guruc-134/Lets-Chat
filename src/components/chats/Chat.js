import { Avatar, IconButton } from '@material-ui/core'
import {useState ,useEffect} from 'react';
import React from 'react'
import './Chat.css'
import {useParams} from 'react-router-dom';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import db from '../../firebase';
import firebase from  'firebase';
import { useStateValue } from '../../StateProvider';

function Chat({sprites = "avataaars"}) {
    const [input,setInput] = useState('');
    const [seed,setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName , setRoomName] = useState("")
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect( ()=>
    {
        if (roomId)
        {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot =>
                {
                    setRoomName(snapshot.data().name)
                })
                setSeed(Math.floor(Math.random()*5000));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot =>
                (
                    setMessages(snapshot.docs.map(doc =>doc.data()))
                ))
        }
    },[roomId])
    useEffect( () =>
    {
        setSeed(Math.floor(Math.random()*5000));
    },[roomId])

    const sendMessage = (e) =>
    {
        if (input.length>0)
        {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add(
            {
                message:input,
                name:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        setInput('')
        }
    }
    return (
        <div className='chat'>
            <div className='chat__header'>
            <Avatar src ={`https://avatars.dicebear.com/api/${sprites}/${seed}.svg`}/>
            <div className='chat__headerInfo'>
                <h3>{roomName}</h3>
                <p>last activity {" "}
                {/* { new Date(messages[messages.length-1].timestamp?.toDate().toLocaleTimeString())
                } */}
                </p>
            </div>
            <div className='chat__headerRight'>
                <IconButton>
                    <SearchOutlined />
                </IconButton>   
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
            </div>
            </div>
            <div className='chat__body'>
                {messages.map((message) =>(          
                    <p className={`chat__message ${message.name === user.displayName &&"chat__reciever"}`}>
                    <span className='chat__name'>
                   {message.name}
                    </span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {/* add a date for every new dat string */}
                               {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                        </span>
                    </p>
                    ))}

            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon/>
                <form>
                <input  value={input} onChange ={e => setInput(e.target.value) } type='text' placeholder='Type a message'/>
                <button onClick={sendMessage} type='submit'>Send</button>
                </form>
                <MicIcon/>
            </div>
        </div>

    )
}

export default Chat
