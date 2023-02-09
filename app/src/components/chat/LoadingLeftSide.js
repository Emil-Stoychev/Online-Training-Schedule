export const LoadingLeftSide = ({ chatsEmpty }) => {
    return (
        <div className="Left-side-chat">
            <input type='search' className='chat-search' placeholder='Loading...' />
            <div className="Chat-container">
                <h2 className='chat-main-header'>Chats</h2>
                <hr />

                {chatsEmpty
                    ? <h2 className='chat-main-header'>No chats.</h2>
                    :
                    <div className="Chat-list">
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

                        <div className="follower-conversation blurOverlay">
                            <div className="chat-profile-image">
                                <img
                                    src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt="Profile" className="followerImage" />
                            </div>
                            <div className="name" >
                                <h3>Loading...</h3>
                                <h5 className="onlineOrOfflineA">Online</h5>
                            </div>
                        </div>

                        <div className="follower-conversation blurOverlay">
                            <div className="chat-profile-image">
                                <img
                                    src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt="Profile" className="followerImage" />
                            </div>
                            <div className="name" >
                                <h3>Loading...</h3>
                                <h5 className="onlineOrOfflineA">Online</h5>
                            </div>
                        </div>

                        <div className="follower-conversation blurOverlay">
                            <div className="chat-profile-image">
                                <img
                                    src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt="Profile" className="followerImage" />
                            </div>
                            <div className="name" >
                                <h3>Loading...</h3>
                                <h5 className="onlineOrOfflineA">Online</h5>
                            </div>
                        </div>

                        <div className="follower-conversation blurOverlay">
                            <div className="chat-profile-image">
                                <img
                                    src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt="Profile" className="followerImage" />
                            </div>
                            <div className="name" >
                                <h3>Loading...</h3>
                                <h5 className="onlineOrOfflineA">Online</h5>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}