import React, { useEffect, useState, useRef } from "react";
import "./chatBox.css";
import * as userService from '../../../services/authService.js'
import * as chatService from '../../../services/chatService.js'
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

const ChatBox = ({ token, chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    // fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id != currentUser);

        if (chat != null) {
            userService.getUserById(token, userId)
                .then(res => {
                    setUserData(res)
                })
        }
    }, [chat, currentUser]);

    // fetch messages
    useEffect(() => {
        if (chat != null) {
            chatService.getMessages(chat?._id)
                .then(res => {
                    console.log(res);
                    setMessages(res);
                })
        };
    }, [chat]);


    // Always scroll to last Message
    useEffect(() => {
        scroll.current?.scrollIntoView();
    }, [messages])



    // Send Message
    const handleSend = async (e) => {
        e.preventDefault()

        if (newMessage.trim() != '') {
            const message = {
                senderId: currentUser,
                text: newMessage,
                chatId: chat?._id,
            }
            const receiverId = chat?.members.find((id) => id != currentUser);

            // send message to socket server
            setSendMessage({ ...message, receiverId })

            // send message to database
            chatService.addMessage(message)
                .then(res => {
                    setMessages([...messages, res]);
                    setNewMessage("");
                })
        }
    }

    // Receive Message from parent component
    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage != null && receivedMessage?.chatId == chat?._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    const scroll = useRef();
    const imageRef = useRef();
    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img
                                        src={userData?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
                                        alt="Profile"
                                        className="followerImage"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="name" style={{ fontSize: "0.9rem" }}>
                                        <span>{userData?.username}</span>
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body" >
                            {messages.map((message, i) => (
                                <>
                                    <div ref={scroll}
                                        key={message?._id + `${i}`}
                                        className={
                                            message.senderId == currentUser
                                                ? "message own"
                                                : "message"
                                        }
                                    >
                                        <span>{message.text}</span>{" "}
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* chat-sender */}
                        <div className="chat-sender">
                            <div onClick={() => imageRef.current.click()}>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className="send-button button" onClick={handleSend}>Send</div>
                            <input
                                type="file"
                                name=""
                                id=""
                                style={{ display: "none" }}
                                ref={imageRef}
                            />
                        </div>{" "}
                    </>
                ) : (
                    <span className="chatbox-empty-message">
                        Tap on a chat to start conversation...
                    </span>
                )}
            </div>
        </>
    );
};

export default ChatBox;