export const LoadingCreatePostTemplate = () => {
    return (
        <article className="create-post">
            <div className="info">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                <div className="profile-image blurOverlay">
                    <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />
                    <textarea name='description' defaultValue='Loading...' placeholder="Text something here..."></textarea>
                </div>

                <div className='buttons blurOverlay'>
                    <button className='' >Post</button>

                    <input type="file" style={{ display: 'none' }} />
                    <button className='' >+ img</button>
                    <select name='select' defaultValue='Public' >
                    </select>
                </div>
            </div>
        </article>
    )
}