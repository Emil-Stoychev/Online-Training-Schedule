export const OwnFollowersComponent = ({ user, userId, navigate, optionWord, onlineUsers }) => {
    return (
        <article className='profile-info-followers'>

            {user?.[optionWord]?.length == 0
                ? <h2 className='noItems'>{optionWord == 'followers' ? 'No followers!' : 'No following!'}</h2>
                :
                <>
                    {user?.[optionWord]?.map((x, i) =>
                        <div className="profile-info-followers-cnt" key={x._id + `${i}`} onClick={() => navigate(`/profile/${x._id}`)}>
                            <div className='profile-info-followers-leftSide'>
                                <img
                                    id={onlineUsers.find(y => y._id == x._id) ? 'onlineOrOffline1' : 'onlineOrOffline2'}
                                    src={x?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />

                                <div>
                                    <h3>{x?.username} {x?._id == userId && '(you)'}</h3>
                                    <p>{x?.location}</p>
                                </div>
                            </div>

                            <div className='profile-info-followers-rightSide'>
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        </div>
                    )}
                </>
            }

        </article>
    )
}