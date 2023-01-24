import { useState } from "react";
import * as imageServce from '../../../services/imageService.js'
import * as chatService from '../../../services/chatService.js'
import { format } from "timeago.js";


export const ChatBodyComponent = ({ message, setFullImages, token, currentUser, setMessages }) => {
    const [toggleDeleteMsg, setToggleDeleteMsg] = useState(false);

    const openImageFullScreen = (imageId) => {
        imageServce.getFullImage(imageId, token)
            .then(res => {
                setFullImages([res])
            })
    }

    const deleteMsg = (msgId) => {
        setToggleDeleteMsg(false)

        chatService.deleteMessage(msgId, token)
            .then(res => {
                if (!res.message) {
                    setMessages(state => state.filter(x => x._id != msgId))
                }
            })
    }

    return (
        <div
            className={
                message.senderId == currentUser
                    ? "message own"
                    : "message"
            }
        >
            <h2>{message?.text}</h2>{" "}
            {message?.image && <img onClick={() => openImageFullScreen(message?.image?._id)} src={message?.image?.thumbnail} />}
            <div className="timeAndDelete">
                <span>{format(message.createdAt)}</span>
                {message.senderId == currentUser && !toggleDeleteMsg &&
                    <i onClick={() => setToggleDeleteMsg(x => !x)} className="fa-solid fa-trash deleteMsgFromChat"></i>
                }
            </div>

            {toggleDeleteMsg && message?.senderId == currentUser &&
                <div className="deleteMsgBtns">
                    <button onClick={() => deleteMsg(message?._id)} >✓</button>
                    <button onClick={() => setToggleDeleteMsg(false)}>X</button>
                </div>
            }
        </div>
    )
}