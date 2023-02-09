export const LoadingProfile = () => {
    return (
        <>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            <article className='profile-info-up blurOverlay'>

                <div>
                    <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' />
                </div>

                <div className='profile-info-in'>

                    <div className='profile-name'>
                        <h1>Loading...</h1>
                        <button>Edit</button>
                    </div>

                    <div className='profile-statistic'>
                        <h3>Posts: 7</h3>
                        <h3>Followers: 7</h3>
                        <h3>Following: 7</h3>
                    </div>

                    <div className='profile-bio'>
                    </div>

                    <div className='profile-name'>
                        <button>Follow</button>
                        <button>Message</button>
                    </div>
                </div>

            </article>
        </>
    )
}