import { useEffect, useRef, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import useGlobalErrorsHook from '../../../hooks/useGlobalErrors.js'
import * as chatService from '../../../services/chatService.js'

import { convertBase64, imageTypes } from '../../../utils/AddRemoveImages'

export const ChatSenderComponent = ({
    token,
    _id,
    chat,
    messages,
    setMessages,
    setSendMessage,
    goToLastMsg
}) => {
    const [newMessage, setNewMessage] = useState({
        text: '',
        image: ''
    });

    let [errors, setErrors] = useGlobalErrorsHook()

    const sendMessageBtn = useRef(null)
    const imageRef = useRef();

    const onEnterClick = (e) => {
        if (e.key == 'Enter') {
            handleSend(e)
        }
    }

    const handleChange = (e) => {
        setNewMessage(state => ({
            ...state,
            text: e
        }))
    }

    // Send Message
    const handleSend = async (e) => {
        e.preventDefault()

        if (newMessage.text?.trim() != '' || newMessage.image) {
            if (newMessage.image) setErrors({ message: 'Sending...', type: 'loading' })

            const message = {
                senderId: _id,
                text: newMessage.text,
                chatId: chat?._id,
                image: newMessage.image
            }


            // send message to database
            chatService.addMessage(message, token)
                .then(res => {
                    const receiverId = chat?.members.find((x) => x._id != _id);
                    // send message to socket server
                    setSendMessage({ res, receiverId: receiverId._id })

                    setMessages([...messages, res]);
                    setNewMessage({
                        text: '',
                        image: ''
                    });

                    setTimeout(() => {
                        goToLastMsg()
                    }, 1);
                })
        }
    }


    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
            setErrors({ message: 'Uploading...', type: '' })
            let base64 = await convertBase64(file)

            if (newMessage.image == base64) {
                if (errors !== 'This image already exist!') {
                    setErrors('This image already exist!')

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                if (newMessage.image != '') {
                    setErrors({ message: 'You cannot upload more than 1 image!', type: '' })
                } else {
                    setNewMessage(state => ({
                        ...state,
                        image: base64
                    }));
                }
            }
        } else {
            setErrors({ message: 'File must be a image! (png, jpeg, jpg, raw)', type: '' })
        }

        e.target.value = null
    }

    const removeImage = (e) => {
        setNewMessage(state => ({
            ...state,
            image: ''
        }));

        setErrors({ message: e, type: 'remove image' })
    }
    return (
        <>
            <div className="chat-sender">
                <div className='inputBox-uploadImages-chat'>
                    {newMessage.image !== '' &&
                        <div key={newMessage.image}>
                            <img src={newMessage.image} />
                            <input
                                className="inputBox-UploadImage-Btn"
                                type="button"
                                value="X"
                                onClick={(e) => removeImage(e)}
                            />
                        </div>
                    }
                </div>
                <div className="plus-image" onClick={() => imageRef.current.click()}>+</div>
                <InputEmoji
                    value={newMessage.text}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={onEnterClick}
                />
                <div ref={sendMessageBtn} className="send-button-chat" onClick={handleSend}>✓</div>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => addImage(e)}
                    style={{ display: "none" }}
                    ref={imageRef}
                />
            </div>{" "}
        </>
    )
}