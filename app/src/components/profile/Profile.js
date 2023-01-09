import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './profile.css'

import * as userService from '../../services/authService'

export const ProfileComponent = ({ token }) => {
    const [user, setUser] = useState({})
    const [viewOptions, setViewOptions] = useState({
        ownPosts: false,
        trainings: false,
        savedPosts: false,
        savedTrainings: false,
        followers: false,
        following: false
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
            savedTrainings: view == 'savedTrainings' ? true : false,
            followers: view == 'followers' ? true : false,
            following: view == 'following' ? true : false
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
                            <h3 onClick={() => changeView('followers')}>Followers: {user?.followers?.length}</h3>
                            <h3 onClick={() => changeView('following')}>Following: {user?.following?.length}</h3>
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

                    {!viewOptions.ownPosts && !viewOptions.followers && !viewOptions.following
                        && !viewOptions.savedPosts && !viewOptions.savedTrainings && !viewOptions.trainings
                        ?
                        <article className='profile-info-posts'>
                            <h2 className='noItems'>You can check your info!</h2>
                        </article>
                        : ''
                    }

                    {viewOptions.ownPosts
                        ?
                        <article className='profile-info-posts'>

                            {user?.ownPosts?.length == 0
                                ? <h2 className='noItems'>No posts yet!</h2>
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
                                ? <h2 className='noItems'>No trainings yet!</h2>
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
                                ? <h2 className='noItems'>No saved posts yet!</h2>
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
                                ? <h2 className='noItems'>No saved trainings yet!</h2>
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

                    {viewOptions.followers
                        ?
                        <article className='profile-info-followers'>

                            {user?.followers?.length == 0
                                ? <h2 className='noItems'>No followers!</h2>
                                :
                                <>
                                    {user?.followers?.map(x =>
                                        <div className="profile-info-followers-cnt">
                                            <div className='profile-info-followers-leftSide'>
                                                <img src={x?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />

                                                <div>
                                                    <h3>{x?.username}</h3>
                                                    <p>{x?.location}</p>
                                                </div>
                                            </div>

                                            <div className='profile-info-followers-rightSide'>
                                                <i className="fa-solid fa-eye"></i>
                                            </div>
                                        </div>
                                    )}
                                </>
                            }

                        </article>
                        : ''
                    }

                    {viewOptions.following
                        ?
                        <article className='profile-info-followers'>

                            {user?.following?.length == 0
                                ? <h2 className='noItems'>No following!</h2>
                                :
                                <>
                                    {user?.following?.map(x =>
                                        <div className="profile-info-followers-cnt">
                                            <div className='profile-info-followers-leftSide'>
                                                <img src={x?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />

                                                <div>
                                                    <h3>{x?.username}</h3>
                                                    <p>{x?.location}</p>
                                                </div>
                                            </div>

                                            <div className='profile-info-followers-rightSide'>
                                                <i className="fa-solid fa-eye"></i>
                                            </div>
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