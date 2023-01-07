import './navigation.module.css'
import { useNavigate } from 'react-router-dom'
import * as userService from '../../../services/authService'
import { useEffect } from 'react'

export const NavigationComponent = ({ token, setToken }) => {
    let navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('sessionStorage')

        setToken(null)

        navigate('/login')
    }

    return (
        <nav className="nav">
            <ul role='list'>
                <div className="main">
                    <li onClick={() => navigate('/')}>Home</li>

                    {token != null
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

                    {token != null
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