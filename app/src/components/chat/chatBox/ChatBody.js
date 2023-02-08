import { useState } from "react";
import * as imageServce from '../../../services/imageService.js'
import * as chatService from '../../../services/chatService.js'
import { format } from "timeago.js";
import useGlobalErrorsHook from "../../../hooks/useGlobalErrors.js";


export const ChatBodyComponent = ({ message, setFullImages, token, currentUser, setMessages }) => {
    const [toggleDeleteMsg, setToggleDeleteMsg] = useState(false);

    let [errors, setErrors] = useGlobalErrorsHook()

    const openImageFullScreen = (imageId) => {
        setErrors({ message: 'Loading...', type: 'loading' })
        imageServce.getFullImage(imageId, token)
            .then(res => {
                setFullImages([res])
            })
    }

    const deleteMsg = (msgId) => {
        setToggleDeleteMsg(false)
        setErrors({ message: 'Deleting...', type: 'loading' })

        chatService.deleteMessage(msgId, token)
            .then(res => {
                if (!res.message) {
                    setErrors({ message: 'Message deleted!', type: '' })

                    setTimeout(() => {
                        setMessages(state => state.filter(x => x._id != msgId))
                    }, 0);
                } else {
                    setErrors({ message: res.message, type: '' })
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