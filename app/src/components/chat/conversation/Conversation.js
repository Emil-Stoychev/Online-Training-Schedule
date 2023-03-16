import { useEffect, useState } from 'react';
import './conversation.css'

const Conversation = ({ token, chat, currentUser, online }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setUserData(chat.members.filter(x => x._id != currentUser)[0])
    }, [])

    return (
        <div className="follower-conversation">
            <div className="chat-profile-image">
                <img
                    src={userData?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
                    alt="Profile"
                    className="followerImage"
                />
            </div>
            <div className="" >
                <h3>{userData?.username?.slice(0, 10)}</h3>
                <h5 className={online ? "onlineOrOfflineA" : "onlineOrOffline"}>{online ? "Online" : "Offline"}</h5>
            </div>
        </div>
    );
};

export default Conversation;