import './welcome.css'
import { Typewriter } from 'react-simple-typewriter'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const WelcomeComponent = () => {
    const navigate = useNavigate()
    const array = ['./postMaker.gif', './calendarEvent.gif', './createCategoryAndTrainingProgram.gif', './galaxy.gif', './gymBuddies.gif']

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
                        <img src={[array[4]]} />
                    </div>
                </article>

                <article className="welcome-art">
                    <div>
                        <h1>
                            Set your {' '}
                            <span>
                                <Typewriter
                                    words={['post.', 'comment.', 'and more...']}
                                    loop={false}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={70}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h1>

                        <h2>Here you can set your post to your friends, add comment, save post and more!</h2>
                    </div>

                    <div>
                        <img src={array[0]} />
                    </div>
                </article>

                <article className="welcome-art">
                    <div>
                        <h1>
                            Your calendar {' '}
                            <span>
                                <Typewriter
                                    words={['events.', 'days.', 'months.', 'years.']}
                                    loop={false}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={70}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h1>

                        <h2>So simple app, quick and easy to use! Can add events for different days, to always be up to date</h2>
                    </div>

                    <div>
                        <img src={[array[1]]} />
                    </div>
                </article>

                <article className="welcome-art">
                    <div>
                        <h1>
                            Set your {' '}
                            <span>
                                <Typewriter
                                    words={['training programs.', 'category.']}
                                    loop={false}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={70}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h1>

                        <h2>Here you can set your category, customizable training programs and see it and fast edit!</h2>
                    </div>

                    <div>
                        <img src={array[2]} />
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

                        <h2>So simple app, quick and easy to use from everywhere and when you want!</h2>
                    </div>

                    <div>
                        <img src={array[3]} />
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

export default WelcomeComponent