import './login.css'

export const LoginComponent = () => {
    return (
        <section className='container'>
            <div className="box">
                <div className="form">

                    <h2>Sign in</h2>

                    <div className="inputBox">
                        <input type="text" required='required' />
                        <span>Username</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" required='required' />
                        <span>Password</span>
                        <i></i>
                    </div>

                    <a href="">Sign up</a>

                    <input type="submit" value="Login" />

                </div>
            </div>
        </section>
    )
}