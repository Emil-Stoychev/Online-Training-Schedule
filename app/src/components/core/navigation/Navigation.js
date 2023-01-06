import './navigation.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const NavigationComponent = ({cookie, setCookie}) => {
    let navigate = useNavigate()

    const logout = () => {
        console.log('Logout click');
        localStorage.removeItem('sessionStorage')

        setCookie(null)

        navigate('/login')
    }

    return (
        <nav className="nav">
            <ul role='list'>
                <div className="main">
                    <li onClick={() => navigate('/')}>Home</li>

                    {cookie != null
                        ?
                        <>
                            <li onClick={() => navigate('/training')}>Training</li>
                            <li onClick={() => navigate('/profile')}>Profile</li>
                            <li onClick={() => navigate('/chat')}>Chat</li>
                        </>
                        :
                        ''
                    }
                </div>

                <span>|</span>

                <div className="auth">
                    <li onClick={() => navigate('/about')}>About</li>

                    {cookie != null
                        ?
                        <>
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

        </nav>
    )
}