import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

export const MessageBoxComponent = ({ x }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className='messagesBox'>
                <div className={x?.read ? 'messageBoxUpRead' : 'messageBoxUp'}>
                    <div className='messageBoxImg' onClick={() => navigate(`/profile/${x?.from?._id}`)}>
                        <img src={x?.from ? x?.from?.image : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />
                    </div>

                    <div className='messagesBoxP'>
                        <p><b onClick={() => navigate(`/profile/${x?.from?._id}`)}>{x.from.username}</b> {x.title}</p>
                    </div>

                    {x?.postId && <div className='messageBoxImgEnd' onClick={() => navigate(`/post/${x?.postId?._id}`)}>
                        <img src={x?.postId?.images?.length > 0 ? x?.postId?.images[0]?.dataString : ''} alt='Post image...' />
                    </div>}
                </div>

                <div className='messageBoxDown'>
                    <p>{format(x.createdAt)}</p>
                </div>
            </div>
        </>
    )
}