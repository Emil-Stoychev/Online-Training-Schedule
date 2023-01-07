import './welcome.css'
import { Typewriter } from 'react-simple-typewriter'
import { useNavigate } from 'react-router-dom'

export const WelcomeComponent = () => {
    const navigate = useNavigate()

    return (
        <>
            <section className="welcome-cnt">

                <article className="welcome-art">
                    <div>
                        <h1>
                            Welcome to {' '}
                            <span>
                                <Typewriter
                                    words={['...', 'budd@!', 'g7mbu441es', 'GymBuddies!']}
                                    loop={false}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={70}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h1>

                        <h2>This application is for fitness group, add and save training programs, share your opinion!</h2>
                    </div>

                    <div>
                        <img src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1" />
                    </div>
                </article>

                <article className="welcome-art">
                    <div>
                        <h1>
                            Set your {' '}
                            <span>
                                <Typewriter
                                    words={['events.', 'training programs.', 'own profile.']}
                                    loop={false}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={70}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h1>

                        <h2>Here you can set your events, customizable training programs and see month programs!</h2>
                    </div>

                    <div>
                        <img src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1" />
                    </div>
                </article>

                <article className="welcome-art">
                    <div>
                        <h1>
                            Available from {' '}
                            <span>
                                <Typewriter
                                    words={['Home.', 'outside.', 'workplace.', 'EVERYWHERE!']}
                                    loop={false}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={70}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h1>

                        <h2>So simple app, quick and easy to use!</h2>
                    </div>

                    <div>
                        <img src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1" />
                    </div>
                </article>

                <article className="welcome-art-starting">
                    <div>
                        <h1>
                            {' '}
                            <span>
                                <Typewriter
                                    words={['What are you waiting for?', "Let's start browsing in this Fitness world, buddy!", "If you don't have acc yet."]}
                                    loop={false}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={70}
                                    deleteSpeed={20}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h1>

                        <div className='welcome-art-main-btns'>
                            <button onClick={() => navigate('/login')}>Login</button>
                            <button onClick={() => navigate('/register')}>Register</button>
                        </div>
                    </div>
                </article>

            </section>
        </>
    )
}