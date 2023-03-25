import { useState } from "react";
import * as imageServce from '../../../services/imageService.js'
import * as chatService from '../../../services/chatService.js'
import { format } from "timeago.js";
import useGlobalErrorsHook from "../../../hooks/useGlobalErrors.js";


export const ChatBodyComponent = ({ message, setFullImages, token, _id, setMessages, setSendMessage, chat }) => {
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

                    setSendMessage({ msgId, receiverId: chat.members.find(x => x._id != _id)._id, type: 'delete', chatId: chat?._id })

                    setMessages(state => state.map(x => {
                        if (x._id != msgId) {
                            return x
                        } else {
                            x.type = 'deleted'

                            return x
                        }
                    }))
                } else {
                    setErrors({ message: res.message, type: '' })
                }
            })
    }

    return (
        <div
            className={
                message.senderId == _id
                    ? "message own"
                    : "message"
            }
        >
            {message.type == 'deleted'
                ? <h4 className="removedMessage">This message was removed!</h4>
                :
                <>
                    <h2>{message?.text}</h2>{" "}
                    {message?.image && <img onClick={() => openImageFullScreen(message?.image?._id)} src={message?.image?.thumbnail} />}
                    <div className="timeAndDelete">
                        <span>{format(message.createdAt)}</span>
                        {message.senderId == _id && !toggleDeleteMsg &&
                            <i onClick={() => setToggleDeleteMsg(x => !x)} className="fa-solid fa-trash deleteMsgFromChat"></i>
                        }
                    </div>

                    {toggleDeleteMsg && message?.senderId == _id &&
                        <div className="deleteMsgBtns">
                            <button onClick={() => deleteMsg(message?._id)} >✓</button>
                            <button onClick={() => setToggleDeleteMsg(false)}>X</button>
                        </div>
                    }
                </>
            }
        </div>
    )
}