import { useEffect, useRef, useState } from 'react'
import './chat.css'
import * as chatService from '../../services/chatService.js'
import ChatBox from './chatBox/ChatBox'
import { io } from 'socket.io-client'

import { FullImageComponent } from './FullImage'
import { LeftSideComponent } from './LeftSide'
import useGlobalErrorsHook from '../../hooks/useGlobalErrors'

const ChatComponent = ({ token, _id, image }) => {
  const [chats, setChats] = useState([])
  const [spareChats, setSpareChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [searchChatValue, setSearchChatValue] = useState("")
  const [fullImages, setFullImages] = useState([]);

  const socket = useRef()
  const leftSide = useRef()
  const rightSide = useRef()

  let [errors, setErrors] = useGlobalErrorsHook()

  useEffect(() => {
    setErrors({ message: 'Loading chats...', type: 'loading' })

    chatService.userChats(_id, token)
      .then(res => {
        setChats(res)
        setSpareChats(res)
      })
  }, [])

  useEffect(() => {
    socket.current = io(`http://${window.location.hostname}:8800`)
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

  const changeStyle = () => {
    leftSide.current.className = 'Left-side-chat clickedChat'
    rightSide.current.className = 'Right-side-chat activeChat'
  }

  const closeCurrentChat = () => {
    leftSide.current.className = 'Left-side-chat'
    rightSide.current.className = 'Right-side-chat'
    setCurrentChat(null)
  }

  useEffect(() => {
    setChats(spareChats)
    if (searchChatValue.trim() != '') {
      setChats(x => x.filter(x => {
        let currUser = x?.members?.filter(x => x._id != _id)

        if (currUser[0].username.toLowerCase().includes(searchChatValue.toLowerCase())) {
          return x
        }
      }))
    } else {
      setChats(spareChats)
    }
  }, [searchChatValue])

  return (
    <section className='container-chat'>

      {fullImages.length > 0 && <FullImageComponent fullImages={fullImages} setFullImages={setFullImages} />}

      <div className="Chat">
        {/* Left Side */}
        <LeftSideComponent
          _id={_id}
          token={token}
          leftSide={leftSide}
          changeStyle={changeStyle}
          onlineUsers={onlineUsers}
          chats={chats}
          setSearchChatValue={setSearchChatValue}
          searchChatValue={searchChatValue}
          setCurrentChat={setCurrentChat}
        />
        {/* Right Side */}
        <div className="Right-side-chat" ref={rightSide}>
          <div>
            {/* <NavIcons /> */}
          </div>

          <ChatBox
            token={token}
            chat={currentChat}
            currentUser={_id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            closeCurrentChat={closeCurrentChat}
            setFullImages={setFullImages}
            setSearchChatValue={setSearchChatValue}
          />
        </div>
      </div>
    </section>
  )
}

export default ChatComponent