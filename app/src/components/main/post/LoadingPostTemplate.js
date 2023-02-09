export const LoadingPostTemplate = () => {
    return (
        <>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

            <div className="post blurOverlay">
                <div className="profile">
                    <div className='post-info'>
                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />
                        <div>
                            <h3>Loading...</h3>
                            <p>Loading...</p>
                        </div>
                    </div>

                    <div>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                </div>

                <div className='images'>
                    <div className='images-image'>
                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' />
                    </div>
                </div>

                <div className='comment-main-title'>
                    <hr />
                    <h2>COMMENTS</h2>
                </div>

                <div className='comments'>
                    <p className='showComments'>Show comments: 7</p>
                </div>

                <div className='addComment-cnt blurOverlay'>
                    <div className='create-comment'>
                        <div className="info">
                            <div className="profile-image">
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />
                                <textarea name='description' defaultValue='Loading...' placeholder="Text something here..."></textarea>
                            </div>

                            <div className='buttons'>
                                <button>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}