import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth,provider} from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
function Login() {
    const [{} , dispatch] = useStateValue();
    const signIn = ()=>
    {
        auth.signInWithPopup(provider)
        .then(result =>
            {
                dispatch(
                    {
                        type: actionTypes.SET_USER,
                        user: result.user
                    }
                )
            } )
            
    }
    return (
        <div className='login'>
            <div className='login__container'>
                <img src="https://img.icons8.com/plasticine/200/000000/chat--v1.png"/>
                <div className = 'login__text'>
                    <h1> Sign in to <b><em>Lets Chat</em></b></h1>
                </div>
                <Button onClick = {signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
