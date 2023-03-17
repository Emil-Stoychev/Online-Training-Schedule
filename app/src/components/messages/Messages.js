import { useEffect, useState } from 'react'
import './messages.css'
import * as userService from '../../services/authService'
import { MessageBoxComponent } from './MessageBox';

export const MessagesComponent = ({ userId }) => {
    const [message, setMessages] = useState([])

    useEffect(() => {
        userService.getAllNotifications(userId, localStorage.getItem('sessionStorage'))
            .then(res => setMessages(res))
    }, [])

    return (
        <>
            <div className='messagesContainer'>
                <h2>Notifications</h2>
                <div className='messagesOptions'>
                </div>
                <div className='messagesMainInfo'>

                    {message.map(x => <MessageBoxComponent key={x._id} x={x} />)}

                </div>
            </div>
        </>
    )
}