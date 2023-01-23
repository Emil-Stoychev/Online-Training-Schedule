import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import "./chatBox.css";
import * as chatService from '../../../services/chatService.js'
import * as imageServce from '../../../services/imageService.js'
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import { convertBase64, imageTypes } from '../../../utils/AddRemoveImages'


const ChatBox = ({ token, chat, currentUser, setSendMessage, receivedMessage, closeCurrentChat, setFullImages }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({
        text: '',
        image: ''
    });
    const [errors, setErrors] = useState('')
    const [skipNumber, setSkipNumber] = useState(0);
    const [toggleDeleteMsg, setToggleDeleteMsg] = useState(false);
    let moreMessages = useRef(true)
    const navigate = useNavigate()

    const sendMessageBtn = useRef(null)

    const scrollBody = useRef()
    let onlyFirstScrollDown = useRef(null)
    const imageRef = useRef();

    const handleChange = (e) => {
        setNewMessage(state => ({
            ...state,
            text: e
        }))
    }

    const handleScroll = () => {
        if (scrollBody.current.scrollTop == 0 && moreMessages.current) {
            setSkipNumber(state => state + 10)
            scrollBody.current.scrollTo(0, 5)
        }
    }

    const closeChat = (option) => {
        setMessages([])
        moreMessages.current = true
        onlyFirstScrollDown.current = null
        setFullImages([])
        setSkipNumber(0)

        if (!option) {
            setUserData(null)
            closeCurrentChat()
        }
    }

    // fetching data for header
    useEffect(() => {
        closeChat(true)
        setUserData(chat?.members?.find((x) => x._id != currentUser))
    }, [chat, currentUser]);

    // fetch messages
    useEffect(() => {
        setNewMessage({
            text: '',
            image: ''
        })

        if (chat != null && moreMessages.current) {
            chatService.getMessages(chat?._id, skipNumber)
                .then(res => {
                    if (res.length == 0) {
                        moreMessages.current = false
                    } else {
                        setMessages(state => [...res, ...state]);

                        if (onlyFirstScrollDown.current == null) {
                            setTimeout(() => {
                                scrollBody.current?.scrollTo(0, scrollBody?.current?.scrollHeight);
                            }, 0);
                            onlyFirstScrollDown.current = false
                        }

                        if (messages.length == 0) {
                            scrollBody.current.addEventListener('scroll', handleScroll)
                        }
                    }
                })
        };
    }, [chat, skipNumber]);

    // Send Message
    const handleSend = async (e) => {
        e.preventDefault()

        if (newMessage.text?.trim() != '' || newMessage.image) {
            const message = {
                senderId: currentUser,
                text: newMessage.text,
                chatId: chat?._id,
                image: newMessage.image
            }


            // send message to database
            chatService.addMessage(message)
                .then(res => {
                    const receiverId = chat?.members.find((x) => x._id != currentUser);
                    // send message to socket server
                    setSendMessage({ res, receiverId: receiverId._id })

                    setMessages([...messages, res]);
                    setNewMessage({
                        text: '',
                        image: ''
                    });
                })
        }
    }

    // Receive Message from parent component
    useEffect(() => {
        if (receivedMessage != null && receivedMessage?.chatId == chat?._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    const goToLastMsg = () => {
        scrollBody.current?.scrollTo(0, scrollBody?.current?.scrollHeight);
    }

    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
            let base64 = await convertBase64(file)

            if (newMessage.image == base64) {
                if (errors !== 'This image already exist!') {
                    setErrors('This image already exist!')

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                if (newMessage.image != '') {
                    if (errors !== 'You cannot upload more than 1 image!') {
                        setErrors('You cannot upload more than 1 image!')

                        setTimeout(() => {
                            setErrors('')
                        }, 2000);
                    }
                } else {
                    setNewMessage(state => ({
                        ...state,
                        image: base64
                    }));
                }
            }
        } else {
            if (errors !== 'File must be a image!') {
                setErrors('File must be a image!')

                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        }

        e.target.value = null
    }

    const removeImage = (e) => {
        setNewMessage(state => ({
            ...state,
            image: ''
        }));
    }

    const openImageFullScreen = (imageId) => {
        imageServce.getFullImage(imageId, token)
            .then(res => {
                setFullImages([res])
            })
    }

    const deleteMsg = (msgId) => {
        setToggleDeleteMsg(false)

        chatService.deleteMessage(msgId, token)
            .then(res => {
                if (!res.message) {
                    setMessages(state => state.filter(x => x._id != msgId))
                }
            })
    }

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
                                    onClick={() => navigate(`/profile/${userData?._id}`)}
                                />
                                <h2 onClick={() => navigate(`/profile/${userData?._id}`)}>{userData?.username}</h2>
                                <button className='closeCurrentChat' onClick={() => closeChat()}>X</button>
                            </div>
                            <hr />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body" ref={scrollBody} >
                            {messages.map((message) => (
                                <div
                                    key={message._id}
                                    className={
                                        message.senderId == currentUser
                                            ? "message own"
                                            : "message"
                                    }
                                >
                                    <h2>{message?.text}</h2>{" "}
                                    {message?.image && <img onClick={() => openImageFullScreen(message?.image?._id)} src={message?.image?.thumbnail} />}
                                    <div className="timeAndDelete">
                                        <span>{format(message.createdAt)}</span>
                                        {message.senderId == currentUser && !toggleDeleteMsg &&
                                            <i onClick={() => setToggleDeleteMsg(x => !x)} className="fa-solid fa-trash deleteMsgFromChat"></i>
                                        }
                                    </div>

                                    {toggleDeleteMsg && message?.senderId == currentUser &&
                                        <div>
                                            <button onClick={() => deleteMsg(message?._id)} >✓</button>
                                            <button onClick={() => setToggleDeleteMsg(false)}>X</button>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                        {/* chat-sender */}
                        <i onClick={goToLastMsg} className="fa fa-arrow-up btn-to-up-in-chat" />
                        <div className="chat-sender">
                            <div className='inputBox-uploadImages-chat'>
                                {newMessage.image !== '' &&
                                    <div key={newMessage.image}>
                                        <img src={newMessage.image} />
                                        <input
                                            className="inputBox-UploadImage-Btn"
                                            type="button"
                                            value="X"
                                            onClick={(e) => removeImage(e)}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="plus-image" onClick={() => imageRef.current.click()}>+</div>
                            <InputEmoji
                                value={newMessage.text}
                                onChange={(e) => handleChange(e)}
                            />
                            <div ref={sendMessageBtn} className="send-button-chat" onClick={handleSend}>✓</div>
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => addImage(e)}
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