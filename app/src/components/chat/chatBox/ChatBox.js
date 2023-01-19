import React, { useEffect, useState, useRef } from "react";
import "./chatBox.css";
import * as chatService from '../../../services/chatService.js'
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

const ChatBox = ({ token, chat, currentUser, setSendMessage, receivedMessage, closeCurrentChat }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessageBtn = useRef(null)

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    // fetching data for header
    useEffect(() => {
        setUserData(chat?.members?.find((x) => x._id != currentUser))
    }, [chat, currentUser]);

    // fetch messages
    useEffect(() => {
        setNewMessage('')

        if (chat != null) {
            chatService.getMessages(chat?._id)
                .then(res => {
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
            const receiverId = chat?.members.find((x) => x._id != currentUser);
            // send message to socket server
            setSendMessage({ ...message, receiverId: receiverId._id })

            // send message to database
            chatService.addMessage(message)
                .then(res => {
                    console.log(res);
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
                                <img
                                    src={userData?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
                                    alt="Profile"
                                    className="followerImage"
                                />
                                <h2>{userData?.username}</h2>
                                <button className='closeCurrentChat' onClick={() => closeCurrentChat()}>X</button>
                            </div>
                            <hr />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body" >
                            {messages.map((message) => (
                                <div ref={scroll}
                                    key={message._id}
                                    className={
                                        message.senderId == currentUser
                                            ? "message own"
                                            : "message"
                                    }
                                >
                                    <h2>{message.text}</h2>{" "}
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            ))}
                        </div>
                        {/* chat-sender */}
                        <div className="chat-sender">
                            <div className="plus-image" onClick={() => imageRef.current.click()}>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div ref={sendMessageBtn} className="send-button-chat" onClick={handleSend}>✓</div>
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
                    <div className="tap-on-chat">
                        <img src="./robot.gif" />
                        <h3 className="chatbox-empty-message">
                            Tap on a chat to start conversation...
                        </h3>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChatBox;