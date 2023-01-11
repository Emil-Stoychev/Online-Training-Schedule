import { useRef, useState } from 'react'
import './addComment.css'

import * as postService from '../../../../services/postService'
import { convertBase64, imageTypes } from '../../../../utils/AddRemoveImages.js'

export const AddCommentComponent = ({ userId, token, post, setPosts, showComments }) => {
    const uploadRef = useRef(null)
    const [values, setValues] = useState({
        description: '',
        image: [],
    })
    const [errors, setErrors] = useState()

    const changeValues = (word) => {

        setValues(state => ({
            ...state,
            [word.target.name]: word.target.value
        }))
    }

    const submitHandler = () => {
        if (values.description.trim() != '' && values.description.length > 0) {

            let data = {
                description: values.description,
                image: values.image,
                token: localStorage.getItem('sessionStorage'),
                userId,
                postId: post?._id
            }

            postService.addComment(data)
                .then(res => {
                    setPosts(state => ({
                        ...state,
                        comments: [...state.comments, showComments ? res : res?._id]
                    }))

                    setValues({
                        description: '',
                        image: [],
                    })
                })
        }
    }

    const uploadFile = () => {
        uploadRef.current.click()
    }

    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
            let base64 = await convertBase64(file)

            let newDate = new Date()

            let date = newDate.toLocaleString()

            let imageData = {
                name: file.name,
                type: file.type,
                date,
                dataString: base64,
            }

            if (values.image.some(x => x.dataString == imageData.dataString)) {
                if (errors !== 'This image already exist!') {
                    setErrors('This image already exist!')

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                if (values.image.length > 0) {
                    if (errors !== 'You cannot upload more than 1 image!') {
                        setErrors('You cannot upload more than 1 image!')

                        setTimeout(() => {
                            setErrors('')
                        }, 2000);
                    }
                } else {
                    setValues(state => ({
                        ...state,
                        ['images']: [...state.image, imageData]
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

        console.log(values);
        e.target.value = null
    }

    const removeImage = (e) => {
        let file = e.target.parentElement.childNodes[0].src

        setValues(state => ({
            ...state,
            ['images']: state.images.filter(x => x.dataString !== file)
        }));
    }

    return (
        <div className='addComment-cnt'>
            <div className='create-comment'>
                <div className="info">
                    <div className="profile-image">
                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />
                        <textarea name='description' value={values.description} onChange={(e) => changeValues(e)} placeholder="Text something here..."></textarea>
                    </div>

                    <div className='buttons'>
                        <button className='' onClick={() => submitHandler()}>Post</button>

                        <input type="file" style={{ display: 'none' }} onChange={(e) => addImage(e)} ref={uploadRef} />
                        <button className='' onClick={() => uploadFile()}>+ img</button>
                    </div>

                    <div className='inputBox-uploadImages'>
                        {values.image?.length > 0 &&
                            values.image?.map(x =>
                                <div key={x.dataString}>
                                    <img src={x.dataString} />
                                    <input
                                        className="inputBox-UploadImage-Btn"
                                        type="button"
                                        value="X"
                                        onClick={(e) => removeImage(e)}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}