import React, { useEffect, useState, useRef } from "react";
import "./chatBox.css";
import * as chatService from '../../../services/chatService.js'

import { ChatHeaderComponent } from "./ChatHeader";
import { ChatBodyComponent } from "./ChatBody";
import { ChatSenderComponent } from "./ChatSender";

const ChatBox = ({
    token,
    chat,
    _id,
    setSendMessage,
    receivedMessage,
    closeCurrentChat,
    setFullImages,
    setSearchChatValue,
    onlineUsers
}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [skipNumber, setSkipNumber] = useState(0);
    const [loadingMsg, setLoadingMsg] = useState(false);

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
        setUserData(chat?.members?.find((x) => x._id != _id))
    }, [chat, _id]);

    // fetch messages
    useEffect(() => {
        if (chat != null && moreMessages.current) {
            setLoadingMsg(true)

            chatService.getMessages(chat?._id, skipNumber)
                .then(res => {
                    setLoadingMsg(false)
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
                            if (scrollBody.current) scrollBody.current.addEventListener('scroll', handleScroll)
                        }
                    }
                })
        };
    }, [chat, skipNumber]);

    // Receive Message from parent component
    useEffect(() => {
        if (receivedMessage != null && receivedMessage?.chatId == chat?._id) {
            if (receivedMessage.type == 'delete') {
                setMessages(state => state.map(x => {
                    if (x._id != receivedMessage.msgId) {
                        return x
                    } else {
                        x.type = 'deleted'

                        return x
                    }
                }))
            } else {
                setMessages([...messages, receivedMessage]);

                setTimeout(() => {
                    goToLastMsg()
                }, 1);
            }
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
                        < ChatHeaderComponent userData={userData} closeChat={closeChat} onlineUsers={onlineUsers}/>

                        {/* chat-body */}
                        <div className="chat-body" ref={scrollBody} >
                            {messages.length == 0 && !loadingMsg && <h2 className="chat-body-noMsg-h2">No messages yet!</h2>}

                            {messages.length == 0
                                &&
                                loadingMsg
                                ?
                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                :
                                messages.map((message) => (
                                    <ChatBodyComponent
                                        key={message._id}
                                        message={message}
                                        setFullImages={setFullImages}
                                        token={token}
                                        _id={_id}
                                        setMessages={setMessages}
                                        setSendMessage={setSendMessage}
                                        chat={chat}
                                    />
                                ))}
                        </div>
                        {/* chat-sender */}
                        {messages.length > 0 && <i onClick={goToLastMsg} className="fa fa-arrow-up btn-to-up-in-chat" />}

                        {!loadingMsg &&
                            <ChatSenderComponent
                                token={token}
                                _id={_id}
                                chat={chat}
                                messages={messages}
                                setMessages={setMessages}
                                setSendMessage={setSendMessage}
                                goToLastMsg={goToLastMsg}
                            />
                        }
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