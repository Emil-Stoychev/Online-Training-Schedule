import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './profile.css'

import * as userService from '../../services/authService'
import { ProfileInfoUpComponent } from './profileInfoUp'
import { OwnPostsComponent } from './OwnPosts'
import { OwnTrainingsComponent } from './OwnTrainings'
import { OwnFollowersComponent } from './OwnFollowers'
import { EditProfileComponent } from './EditProfile'
import { LoadingProfile } from './LoadingProfile'

const ProfileComponent = ({ setToken, token, userId, email, socket }) => {
    const [user, setUser] = useState({})
    const [viewOptions, setViewOptions] = useState({
        ownPosts: false,
        trainings: false,
        savedPosts: false,
        savedTrainings: false,
        followers: false,
        following: false,
        edit: false
    })
    const [loadingInfoDivs, setLoadingInfoDivs] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        window.onload = window.scrollTo(0, 0)
        let urlId = window.location.pathname.split('/profile/')[1]
        let profileId = urlId != null ? urlId : userId

        userService.getUserById(token, profileId)
            .then(res => {
                if (!res.message) {
                    setUser(res)

                    setViewOptions({
                        ownPosts: false,
                        trainings: false,
                        savedPosts: false,
                        savedTrainings: false,
                        followers: false,
                        following: false,
                        edit: false
                    })
                } else {

                }
            })
    }, [window.location.pathname])

    const changeView = (view) => {
        setLoadingInfoDivs(true)

        setViewOptions({
            ownPosts: view == 'ownPosts' ? true : false,
            trainings: view == 'trainings' ? true : false,
            savedPosts: view == 'savedPosts' ? true : false,
            savedTrainings: view == 'savedTrainings' ? true : false,
            followers: view == 'followers' ? true : false,
            following: view == 'following' ? true : false,
            edit: view == 'edit' && !viewOptions.edit,
        })

        if (view != 'edit') {
            let urlId = window.location.pathname.split('/profile/')[1]
            let profileId = urlId != null ? urlId : userId

            userService.getByOption(token, view, profileId)
                .then(res => {
                    setLoadingInfoDivs(false)
                    if (!res.message && res.message != 'Empty!') {
                        setUser(state => ({
                            ...state,
                            [view]: res
                        }))
                    }
                })
        } else {
            setLoadingInfoDivs(false)
        }
    }

    return (
        <>
            <section className='profile-cont'>

                {user._id
                    ?
                    <ProfileInfoUpComponent
                        token={token}
                        user={user}
                        setUser={setUser}
                        setViewOptions={setViewOptions}
                        changeView={changeView}
                        userId={userId}
                        viewOptions={viewOptions}
                        socket={socket}
                    />
                    : <LoadingProfile />}

                <hr />

                <article className={`profile-nav ${!user._id && 'blurOverlay'}`}>
                    <ul role='list'>
                        <li disabled={!user._id} onClick={() => changeView('ownPosts')} className={viewOptions.ownPosts ? 'active' : ''}>Posts</li>
                        <li disabled={!user._id} onClick={() => changeView('trainings')} className={viewOptions.trainings ? 'active' : ''}>Trainings</li>
                        {user?._id == userId &&
                            <>
                                <li disabled={!user._id} onClick={() => changeView('savedPosts')} className={viewOptions.savedPosts ? 'active' : ''}>Saved</li>
                                <li disabled={!user._id} onClick={() => changeView('savedTrainings')} className={viewOptions.savedTrainings ? 'active' : ''}>Saved Trainings</li>
                            </>
                        }
                    </ul>
                </article>


                <article className='profile-info-main'>


                    {loadingInfoDivs && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}

                    {!loadingInfoDivs && !Object.values(viewOptions).some(x => x == true) &&
                        <article className='profile-info-posts'>
                            <h2 className={`noItems  ${!user._id && 'blurOverlay'}`}>You can check your info!</h2>
                        </article>
                    }

                    {viewOptions.edit && <EditProfileComponent email={email} setToken={setToken} user={user} userId={userId} token={token} setUser={setUser} setViewOptions={setViewOptions} changeView={changeView} />}

                    {!loadingInfoDivs && (viewOptions.ownPosts || viewOptions.savedPosts) &&
                        <OwnPostsComponent user={user} navigate={navigate} optionWord={viewOptions.ownPosts ? 'ownPosts' : 'savedPosts'} />}

                    {!loadingInfoDivs && (viewOptions.trainings || viewOptions.savedTrainings) &&
                        <OwnTrainingsComponent user={user} navigate={navigate} optionWord={viewOptions.trainings ? 'trainings' : 'savedTrainings'} />}

                    {!loadingInfoDivs && (viewOptions.followers || viewOptions.following) &&
                        <OwnFollowersComponent user={user} userId={userId} navigate={navigate} optionWord={viewOptions.followers ? 'followers' : 'following'} />}

                </article>
            </section>
        </>
    )
}

export default ProfileComponent