import { useRef, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import * as chatService from '../../../services/chatService.js'

import { convertBase64, imageTypes } from '../../../utils/AddRemoveImages'

export const ChatSenderComponent = ({
    token,
    currentUser,
    chat,
    messages,
    setMessages,
    setSendMessage
}) => {
    const [errors, setErrors] = useState('')
    const [newMessage, setNewMessage] = useState({
        text: '',
        image: ''
    });

    const sendMessageBtn = useRef(null)
    const imageRef = useRef();

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
            const message = {
                senderId: currentUser,
                text: newMessage.text,
                chatId: chat?._id,
                image: newMessage.image
            }


            // send message to database
            chatService.addMessage(message, token)
                .then(res => {
                    const receiverId = chat?.members.find((x) => x._id != currentUser);
                    // send message to socket server
                    setSendMessage({ res, receiverId: receiverId._id })

                    setMessages([...messages, res]);
                    setNewMessage({
                        text: '',
                        image: ''
                    });
                })
        }
    }


    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
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
                    if (errors !== 'You cannot upload more than 1 image!') {
                        setErrors('You cannot upload more than 1 image!')

                        setTimeout(() => {
                            setErrors('')
                        }, 2000);
                    }
                } else {
                    setNewMessage(state => ({
                        ...state,
                        image: base64
                    }));
                }
            }
        } else {
            if (errors !== 'File must be a image!') {
                setErrors('File must be a image!')

                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        }

        e.target.value = null
    }

    const removeImage = (e) => {
        setNewMessage(state => ({
            ...state,
            image: ''
        }));
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