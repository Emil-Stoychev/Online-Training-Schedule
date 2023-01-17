import React, { useState, useEffect } from "react";
import * as userService from '../../../services/authService.js'
import './conversation.css'

const Conversation = ({ token, data, currentUser, online }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser)

        userService.getUserById(token, userId)
            .then(res => {
                setUserData(res)
            })
    }, [])
    return (
        <>
            <div className="follower-conversation">
                <div className="chat-profile-image">
                    {online && <div className="online-dot"></div>}
                    <img
                        src={userData?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
                        alt="Profile"
                        className="followerImage"
                    />
                </div>
                <div className="name" >
                    <h3>{userData?.username?.slice(0, 10)}</h3>
                    <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                </div>
            </div>
        </>
    );
};

export default Conversation;