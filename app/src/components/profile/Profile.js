import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './profile.css'

import * as userService from '../../services/authService'

export const ProfileComponent = ({ token }) => {
    const [user, setUser] = useState({})
    const [viewOptions, setViewOptions] = useState({
        ownPosts: true,
        trainings: false,
        savedPosts: false,
        savedTrainings: false
    })

    const navigate = useNavigate()

    useEffect(() => {
        userService.getUserById(token)
            .then(res => {
                if (!res.message) {
                    console.log(res);
                    setUser(res)
                } else {

                }
            })
    }, [])

    const changeView = (view) => {
        setViewOptions({
            ownPosts: view == 'ownPosts' ? true : false,
            trainings: view == 'trainings' ? true : false,
            savedPosts: view == 'savedPosts' ? true : false,
            savedTrainings: view == 'savedTrainings' ? true : false
        })

        userService.getByOption(token, view)
        .then(res => console.log(res))
    }


    return (
        <>

            <section className='profile-cont'>

                <article className='profile-info-up'>
                    <div>
                        <img src={user?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} />
                    </div>

                    <div className='profile-info-in'>

                        <div className='profile-name'>
                            <h1>{user?.username}</h1>
                            <button>Edit</button>
                        </div>

                        <div className='profile-statistic'>
                            <h3>Posts: {user?.ownPosts?.length}</h3>
                            <h3>Followers: {user?.followers?.length}</h3>
                            <h3>Following: {user?.following?.length}</h3>
                        </div>

                        <div className='profile-bio'>
                        </div>

                        <div className='profile-name'>
                            <button>Follow</button>
                            <button>Message</button>
                        </div>
                    </div>

                </article>

                <hr />

                <article className='profile-nav'>

                    <ul role='list'>
                        <li onClick={() => changeView('ownPosts')} className={viewOptions.ownPosts ? 'active' : ''}>Posts</li>
                        <li onClick={() => changeView('trainings')} className={viewOptions.trainings ? 'active' : ''}>Trainings</li>
                        <li onClick={() => changeView('savedPosts')} className={viewOptions.savedPosts ? 'active' : ''}>Saved</li>
                        <li onClick={() => changeView('savedTrainings')} className={viewOptions.savedTrainings ? 'active' : ''}>Saved Trainings</li>
                    </ul>
                </article>


                <article className='profile-info-main'>

                    {viewOptions.ownPosts
                        ?
                        <article className='profile-info-posts'>

                            {user?.ownPosts?.length == 0
                                ? <h2>No posts yet!</h2>
                                :
                                <>
                                    {user?.ownPosts?.map(x =>
                                        <div key={x._id} className='posts-small' onClick={() => navigate('/post/' + x._id)}>
                                            {x?.images?.length > 0 && <img src={x?.images[0]?.dataString || ''} />}

                                            <h2>{x?.description.slice(0, 20) + '...'}</h2>
                                        </div>
                                    )}
                                </>
                            }


                        </article>
                        : ''
                    }

                    {viewOptions.trainings
                        ?
                        <article className='profile-info-trainings'>

                            {user?.trainings?.length == 0
                                ? <h2>No trainings yet!</h2>
                                :
                                <>
                                    {user?.trainings?.map(x =>
                                        <div>
                                            <img src={x?.images[0] || ''} />

                                            <h2>{x?.description.slice(0, 20) + '...'}</h2>
                                        </div>
                                    )}
                                </>
                            }

                        </article>
                        : ''
                    }

                    {viewOptions.savedPosts
                        ?
                        <article className='profile-info-posts saved'>

                            {user?.savedPosts?.length == 0
                                ? <h2>No saved posts yet!</h2>
                                :
                                <>
                                    {user?.savedPosts?.map(x =>
                                        <div className='posts-small'>
                                            <img src={x?.images[0] || ''} />

                                            <h2>{x?.description.slice(0, 20) + '...'}</h2>
                                        </div>
                                    )}
                                </>
                            }

                        </article>
                        : ''
                    }

                    {viewOptions.savedTrainings
                        ?
                        <article className='profile-info-trainings'>

                            {user?.savedTrainings?.length == 0
                                ? <h2>No saved trainings yet!</h2>
                                :
                                <>
                                    {user?.savedTrainings?.map(x =>
                                        <div>
                                            <img src={x?.images[0] || ''} />

                                            <h2>{x?.description.slice(0, 20) + '...'}</h2>
                                        </div>
                                    )}
                                </>
                            }

                        </article>
                        : ''
                    }

                </article>

            </section>

        </>
    )
}