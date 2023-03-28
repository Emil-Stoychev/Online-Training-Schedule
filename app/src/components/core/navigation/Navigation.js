import './navigation.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { MessagesComponent } from '../../messages/Messages'
import * as userService from '../../../services/authService'

export const NavigationComponent = ({ token, setToken, userId, newNot, setNewNot, socket, soundNotification }) => {
    const [toggleBtn, setToggleBtn] = useState(false)
    const [messages, setMessages] = useState(false)
    let navigate = useNavigate()
    const navTogBtn1 = useRef()
    const navTogBtnMiddle = useRef()
    const navTogBtn2 = useRef()
    const toggleNavDiv = useRef()
    const navUL = useRef()

    const logout = () => {
        localStorage.removeItem('sessionStorage')

        setToken(null)

        navigate('/login')
    }

    useEffect(() => {
        socket.current?.on('getNotification', async (data) => {
            setNewNot(state => state + 1)

            if (soundNotification) {
                await new Audio('./msgAudio.mp3').play()
            }
        })

    }, [socket.current])

    useEffect(() => {
        if (messages == true) {
            setNewNot(0)
            userService.readAllNotifications(userId, localStorage.getItem('sessionStorage'))
        }
    }, [messages])

    const toggleNav = () => {
        setToggleBtn(x => !x)

        if (toggleBtn) {
            navTogBtn1.current.className = 'nav-tog-btn'
            navTogBtn2.current.className = 'nav-tog-btn'
            navUL.current.style.display = 'none'
            navTogBtnMiddle.current.style.display = 'block'
        } else {
            navTogBtn1.current.className = 'nav-tog-btn active1'
            navTogBtn2.current.className = 'nav-tog-btn active2'
            navUL.current.style.display = 'flex'
            navTogBtnMiddle.current.style.display = 'none'
        }
    }

    useEffect(() => {
        if (userId) {
            userService.getAllNotificationsNumber(userId, localStorage.getItem('sessionStorage'))
                .then(res => {
                    setNewNot(res)
                })
        }
    }, [token])

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 780) {
                navUL.current.style.display = 'flex'
            } else {
                navTogBtn1.current.className = 'nav-tog-btn'
                navTogBtn2.current.className = 'nav-tog-btn'
                navTogBtnMiddle.current.style.display = 'block'
                navUL.current.style.display = 'none'
                setToggleBtn(false)
            }
        })
    }, [])

    const toggleMessageShow = () => {
        setTimeout(() => {
            setMessages(true)
        }, 0);
    }

    return (
        <>
            <nav className="nav">
                <ul role='list' ref={navUL}>
                    <div className="main">
                        <li onClick={() => navigate('/')}>Home</li>

                        {token != null
                            ?
                            <>
                                <li onClick={() => navigate('/training')}>Training</li>
                                <li onClick={() => navigate('/profile')}>Profile</li>
                                <li onClick={() => navigate('/chat')}>Chat</li>
                                <li onClick={() => navigate('/search')}><i className="fa-solid fa-magnifying-glass"></i></li>
                            </>
                            :
                            ''
                        }
                    </div>

                    <span className='navigationSpan'>|</span>

                    <div className="auth">
                        <li onClick={() => navigate('/about')}>About</li>

                        {token != null
                            ?
                            <>
                                <li onClick={() => toggleMessageShow()}><i onClick={() => toggleMessageShow()} className='fa-sharp fa-regular fa-message'></i>{newNot > 0 ? <b className={`showNewNotification${newNot > 0 ? 'A' : ''}`}>{newNot}</b> : ''}</li>
                                <li onClick={() => logout()}>Logout</li>
                            </>
                            :
                            <>
                                <li onClick={() => navigate('/login')}>Login</li>
                                <li onClick={() => navigate('/register')}>Register</li>
                            </>
                        }
                    </div>
                </ul>

                <div className='navigation-toggle' onClick={toggleNav} ref={toggleNavDiv}>
                    <button ref={navTogBtn1} className='nav-tog-btn'></button>
                    <button ref={navTogBtnMiddle} className='nav-tog-btn'></button>
                    <button ref={navTogBtn2} className='nav-tog-btn'></button>
                </div>
            </nav>

            {messages && <MessagesComponent userId={userId} setMessages={setMessages} messages={messages} toggleNav={toggleNav} />}
        </>
    )
}