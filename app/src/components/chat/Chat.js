import { useEffect, useRef, useState } from 'react'
import './chat.css'
import * as chatService from '../../services/chatService.js'
import ChatBox from './chatBox/ChatBox'
import { io } from 'socket.io-client'

import { FullImageComponent } from './FullImage'
import { LeftSideComponent } from './LeftSide'

const ChatComponent = ({ token, _id, image, onlineUsers, socket }) => {
  const [chats, setChats] = useState([])
  const [spareChats, setSpareChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)
  const [searchChatValue, setSearchChatValue] = useState("")
  const [fullImages, setFullImages] = useState([]);
  const [chatsEmpty, setChatsEmpty] = useState(false)
  const [loadingChats, setLoadingChats] = useState(false)

  const leftSide = useRef()
  const rightSide = useRef()

  useEffect(() => {
    setLoadingChats(true)
    chatService.userChats(_id, token)
      .then(res => {
        setLoadingChats(false)
        if (res.length == 0) {
          setChatsEmpty(true)
        } else {
          setChatsEmpty(false)
        }

        setChats(res)
        setSpareChats(res)
      })
  }, [])

  useEffect(() => {
    if (sendMessage != null) {
      socket.current?.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current?.on('receive-message', (data) => {
      setReceivedMessage(data)
    })
  }, [receivedMessage])

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
          loadingChats={loadingChats}
        />
        {/* Right Side */}
        <div className="Right-side-chat" ref={rightSide}>
          <div>
            {/* <NavIcons /> */}
          </div>

          <ChatBox
            token={token}
            chat={currentChat}
            _id={_id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            closeCurrentChat={closeCurrentChat}
            setFullImages={setFullImages}
            setSearchChatValue={setSearchChatValue}
            onlineUsers={onlineUsers}
          />
        </div>
      </div>
    </section>
  )
}

export default ChatComponent