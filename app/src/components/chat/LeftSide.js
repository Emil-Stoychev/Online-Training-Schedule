import Conversation from './conversation/Conversation'

export const LeftSideComponent = ({
    _id,
    token,
    leftSide,
    changeStyle,
    onlineUsers,
    chats,
    setSearchChatValue,
    searchChatValue,
    setCurrentChat,
    loadingChats
}) => {

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find(x => x._id != _id)
        const online = onlineUsers.find(x => x.userId == chatMember._id)
        return online ? true : false
    }

    return (
        <div className="Left-side-chat" ref={leftSide}>
            <input type='search' value={searchChatValue} onChange={(e) => setSearchChatValue(e.currentTarget.value)} className='chat-search' placeholder='Find chat' />
            <div className="Chat-container">
                <h2 className='chat-main-header' >Chats</h2>
                <hr />
                <div className="Chat-list">
                    {loadingChats && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}

                    {!loadingChats && chats.length == 0 && <h2 className='chat-body-noMsg-h2'>No chats!</h2>}
                    {chats.map((chat) => (
                        <div
                            key={chat._id}
                            onClick={() => {
                                setCurrentChat(chat)
                                changeStyle()
                            }}
                        >
                            <Conversation
                                token={token}
                                chat={chat}
                                currentUser={_id}
                                online={checkOnlineStatus(chat)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}