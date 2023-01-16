import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import * as userService from '../../../services/authService.js'

const Conversation = ({ token, data, currentUser, online }) => {
    const [userData, setUserData] = useState(null)
    // const dispatch = useDispatch()

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser)

        userService.getUserById(token, userId)
            .then(res => {
                setUserData(res)
                // dispatch({ type: "SAVE_USER", data: res })
            })
    }, [])
    return (
        <>
            <div className="follower conversation">
                <div>
                    {online && <div className="online-dot"></div>}
                    <img
                        src={userData?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
                        alt="Profile"
                        className="followerImage"
                        style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>{userData?.username}</span>
                        <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    );
};

export default Conversation;