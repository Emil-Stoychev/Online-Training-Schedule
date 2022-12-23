import './navigation.module.css'

export const NavigationComponent = () => {
    return (
        <nav className="nav">
            <ul role='list'>
                <div className="main">
                    <li>Home</li>
                    <li>Training</li>
                    <li>About</li>
                    <li>Profile</li>
                </div>

                <span>|</span>

                <div className="auth">
                    <li>Login</li>
                    <li>Register</li>
                    <li>Logout</li>
                </div>
            </ul>

        </nav>
    )
}