import './register.css'

export const RegisterComponent = () => {
    return (
        <section className='container'>
            <div className="box">
                <div className="form">

                    <h2>Sign up</h2>

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

                    <div className="inputBox">
                        <input type="password" required='required' />
                        <span>Repeat password</span>
                        <i></i>
                    </div>

                    <a href="">Sign in</a>

                    <input type="submit" value="Register" />

                </div>
            </div>
        </section>
    )
}