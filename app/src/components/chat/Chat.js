import { useEffect, useRef, useState } from 'react'
import './chat.css'
import * as chatService from '../../services/chatService.js'
import Conversation from './conversation/Conversation'
import ChatBox from './chatBox/ChatBox'
import { io } from 'socket.io-client'

export const ChatComponent = ({ token, _id, image }) => {
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  const socket = useRef()

  useEffect(() => {
    chatService.userChats(_id, token)
      .then(res => {
        setChats(res)
        console.log(res)
      })
  }, [])

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', _id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [_id])

  useEffect(() => {
    if (sendMessage != null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setReceivedMessage(data)
    })
  }, [])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find(x => x != _id)
    const online = onlineUsers.find(x => x.userId == chatMember)
    return online ? true : false
  }

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <LogoSearch />  HERE I SHOULD ADD A SEARCH BAR AND BTN */}
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat, i) => (
              <div
                key={chat._id + `${i}`}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  token={token}
                  data={chat}
                  currentUser={_id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>

        <ChatBox
          token={token}
          chat={currentChat}
          currentUser={_id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  )
}