import { useEffect, useRef, useState } from 'react'
import './messages.css'
import * as userService from '../../services/authService'
import { MessageBoxComponent } from './MessageBox';

export const MessagesComponent = ({ userId }) => {
    const [message, setMessages] = useState([])
    const [skipNum, setSkipNum] = useState(0)
    const [loading, setLoading] = useState(true)
    const [moreMsgs, setMoreMsgs] = useState(true)

    let msgBodyScroll = useRef(null)

    useEffect(() => {
        msgBodyScroll.current.addEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (moreMsgs) {
            setLoading(true)
            userService.getAllNotifications(userId, localStorage.getItem('sessionStorage'), skipNum)
                .then(res => {
                    if (res.message == 'Empty!') {
                        setMoreMsgs(false)
                        setLoading(false)
                        return
                    }
                    setLoading(false)
                    setMessages(state => [...state, ...res])
                })
        }
    }, [skipNum])

    const handleScroll = () => {
        if (msgBodyScroll.current && msgBodyScroll.current.clientHeight + msgBodyScroll.current.scrollTop + 1 >= msgBodyScroll.current.scrollHeight) {
            setSkipNum(state => state + 10)
        }
    }

    return (
        <>
            <div className='messagesContainer'>
                <h2>Notifications</h2>
                <div className='messagesOptions'>
                </div>
                <div className='messagesMainInfo' ref={msgBodyScroll}>

                    {message.map(x => <MessageBoxComponent key={x._id} x={x} />)}

                    {loading && <h1 className="loading-in-cnt"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></h1>}
                </div>
            </div>
        </>
    )
}