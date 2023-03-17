import './navigation.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { MessagesComponent } from '../../messages/Messages'

export const NavigationComponent = ({ token, setToken, userId }) => {
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
                                <li onClick={() => setMessages(state => !state)}><i className="fa-sharp fa-regular fa-message"></i></li>
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

            {messages && <MessagesComponent userId={userId} />}
        </>
    )
}