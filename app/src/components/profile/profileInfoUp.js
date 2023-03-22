import { useNavigate } from 'react-router-dom'
import * as userService from '../../services/authService'
import * as chatService from '../../services/chatService'

export const ProfileInfoUpComponent = ({ token, user, setUser, setViewOptions, changeView, userId, viewOptions, socket }) => {
    const navigate = useNavigate()

    const toggleFollowProcess = () => {
        userService.toggleFollowPerson(token, user?._id)
            .then(res => {
                if (!res.message) {
                    setUser(state => ({
                        ...state,
                        followers: res
                    }))

                    if (res.length > 0) {
                        socket.current?.emit("sendNotification", {
                            senderId: userId,
                            receiverId: user?._id,
                        })
                    }

                    setViewOptions({
                        ownPosts: false,
                        trainings: false,
                        savedPosts: false,
                        savedTrainings: false,
                        followers: false,
                        following: false,
                        edit: false
                    })
                }
            })
    }

    const createNewChat = () => {
        if (user._id != userId && user._id != '' && userId != '') {
            chatService.createChat(userId, user._id, token)
                .then(res => {
                    navigate('/chat')
                })
        }
    }

    return (
        <article className='profile-info-up'>
            <div>
                <img src={user?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} />
            </div>

            <div className='profile-info-in'>

                <div className='profile-name'>
                    <h1>{user?.username}</h1>
                    {user._id == userId && <button onClick={() => changeView('edit')}>{viewOptions.edit ? 'Cancel' : 'Edit'}</button>}
                </div>

                <div className='profile-statistic'>
                    <h3 onClick={() => changeView('ownPosts')}>Posts: {user?.ownPosts?.length}</h3>
                    <h3 onClick={() => changeView('followers')}>Followers: {user?.followers?.length}</h3>
                    <h3 onClick={() => changeView('following')}>Following: {user?.following?.length}</h3>
                </div>

                <div className='profile-bio'>
                    <p>{user?.location}</p>
                </div>

                <div className='profile-name'>
                    {user._id != userId &&
                        <>
                            <button onClick={() => toggleFollowProcess()} >{user?.followers?.includes(userId) || user?.followers?.find(x => x._id == userId) ? 'Unfollow' : 'Follow'}</button>
                            <button onClick={() => createNewChat()} >Message</button>
                        </>
                    }
                </div>
            </div>

        </article>
    )
}