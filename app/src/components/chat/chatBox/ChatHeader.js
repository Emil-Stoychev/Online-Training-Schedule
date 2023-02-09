import { useNavigate } from "react-router-dom"

export const ChatHeaderComponent = ({ userData, closeChat }) => {
    const navigate = useNavigate()

    return (
        <div className="chat-header" >
            <div className="follower">
                <img
                    src={userData?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
                    alt="Profile"
                    className="followerImage"
                    onClick={() => navigate(`/profile/${userData?._id}`)}
                />
                <h2 onClick={() => navigate(`/profile/${userData?._id}`)}>{userData ? userData?.username : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}</h2>
                <button className='closeCurrentChat' onClick={() => closeChat()}>X</button>
            </div>
            <hr />
        </div >
    )
}