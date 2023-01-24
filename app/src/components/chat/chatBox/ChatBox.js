import React, { useEffect, useState, useRef } from "react";
import "./chatBox.css";
import * as chatService from '../../../services/chatService.js'

import { ChatHeaderComponent } from "./ChatHeader";
import { ChatBodyComponent } from "./ChatBody";
import { ChatSenderComponent } from "./ChatSender";


const ChatBox = ({
    token,
    chat,
    currentUser,
    setSendMessage,
    receivedMessage,
    closeCurrentChat,
    setFullImages,
    setSearchChatValue
}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [skipNumber, setSkipNumber] = useState(0);

    let moreMessages = useRef(true)
    const scrollBody = useRef()
    let onlyFirstScrollDown = useRef(null)

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
        setSearchChatValue('')

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

    // Receive Message from parent component
    useEffect(() => {
        if (receivedMessage != null && receivedMessage?.chatId == chat?._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    const goToLastMsg = () => {
        scrollBody.current?.scrollTo(0, scrollBody?.current?.scrollHeight);
    }

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <ChatHeaderComponent userData={userData} closeChat={closeChat} />

                        {/* chat-body */}
                        <div className="chat-body" ref={scrollBody} >
                            {messages.map((message) => (
                                <ChatBodyComponent
                                    key={message._id}
                                    message={message}
                                    setFullImages={setFullImages}
                                    token={token}
                                    currentUser={currentUser}
                                    setMessages={setMessages}
                                />
                            ))}
                        </div>
                        {/* chat-sender */}
                        <i onClick={goToLastMsg} className="fa fa-arrow-up btn-to-up-in-chat" />

                        <ChatSenderComponent
                            token={token}
                            currentUser={currentUser}
                            chat={chat}
                            messages={messages}
                            setMessages={setMessages}
                            setSendMessage={setSendMessage}
                        />
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