import React, { useEffect, useState, useRef } from "react";
import "./chatBox.css";
import * as chatService from '../../../services/chatService.js'
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

const ChatBox = ({ token, chat, currentUser, setSendMessage, receivedMessage, closeCurrentChat }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [skipNumber, setSkipNumber] = useState(0);
    const [ontop, setOntop] = useState(true)
    let moreMessages = useRef(true)

    const sendMessageBtn = useRef(null)

    const scrollBody = useRef()
    const scrollToMessage = useRef()
    const imageRef = useRef();

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const handleScroll = () => {
        if (scrollBody.current.scrollTop == 0 && moreMessages) {
            setSkipNumber(state => state + 10)
            scrollBody.current.scrollTo(0, 5)
        }
    }

    const closeChat = () => {
        setUserData(null)
        setMessages([])
        moreMessages = true
        closeCurrentChat()
    }

    // fetching data for header
    useEffect(() => {
        setSkipNumber(0)
        moreMessages = true
        setMessages([])
        setUserData(chat?.members?.find((x) => x._id != currentUser))
    }, [chat, currentUser]);

    // fetch messages
    useEffect(() => {
        setNewMessage('')

        if (chat != null) {
            chatService.getMessages(chat?._id, skipNumber)
                .then(res => {
                    if (res.length == 0) {
                        moreMessages = false
                    } else {
                        setMessages(state => [...res, ...state]);

                        if (messages.length == 0) {
                            scrollBody.current.addEventListener('scroll', handleScroll)
                        }
                    }
                })
        };
    }, [chat, skipNumber]);

    useEffect(() => {
        scrollToMessage.current?.scrollIntoView();
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
                    setMessages([...messages, res]);
                    setNewMessage("");
                })
        }
    }

    // Receive Message from parent component
    useEffect(() => {
        if (receivedMessage != null && receivedMessage?.chatId == chat?._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    const goToTop = () => {
        scrollBody.current?.scrollTo(0, scrollBody?.current?.scrollHeight);
    }

    // useEffect(() => {
    //     scrollBody.current?.addEventListener('scroll', () => {
    //         console.log(scrollBody.current?.scrollTop);
    //         console.log(scrollBody.current?.scrollHeight);
    //         if (scrollBody.current?.scrollHeight - scrollBody?.current?.scrollTop > (scrollBody.current?.scrollHeight - 50)) {
    //             setOntop(true)
    //         } else {
    //             if (!ontop) {
    //                 setOntop(false)
    //             }
    //         }
    //     })
    // }, [])

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
                                <button className='closeCurrentChat' onClick={() => closeChat()}>X</button>
                            </div>
                            <hr />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body" ref={scrollBody} >
                            {messages.map((message) => (
                                <div ref={scrollToMessage}
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
                        {ontop && <i onClick={goToTop} className="fa fa-arrow-up btn-to-up-in-chat" />}
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