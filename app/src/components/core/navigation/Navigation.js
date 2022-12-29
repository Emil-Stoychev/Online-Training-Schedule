import './navigation.module.css'
import { useNavigate } from 'react-router-dom'

export const NavigationComponent = () => {
    let navigate = useNavigate()

    const logout = () => {
        console.log('Logout click');
        localStorage.removeItem('sessionStorage')
    }

    return (
        <nav className="nav">
            <ul role='list'>
                <div className="main">
                    <li onClick={() => navigate('/')}>Home</li>
                    <li onClick={() => navigate('/training')}>Training</li>
                    <li onClick={() => navigate('/profile')}>Profile</li>
                    <li onClick={() => navigate('/about')}>About</li>
                </div>

                <span>|</span>

                <div className="auth">
                    <li onClick={() => navigate('/login')}>Login</li>
                    <li onClick={() => navigate('/register')}>Register</li>
                    <li onClick={() => logout()}>Logout</li>
                </div>
            </ul>

        </nav>
    )
}