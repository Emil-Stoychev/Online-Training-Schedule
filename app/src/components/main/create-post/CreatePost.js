import { useRef, useState } from 'react'
import './create-post.css'

import { convertBase64, imageTypes } from '../../../utils/AddRemoveImages.js'
import * as postService from '../../../services/postService.js'
import useGlobalErrorsHook from '../../../hooks/useGlobalErrors'

export const CreatePost = ({ setPosts, image }) => {
    const uploadRef = useRef(null)
    const [values, setValues] = useState({
        description: '',
        images: [],
        select: 'Public'
    })

    let [errors, setErrors] = useGlobalErrorsHook()

    const changeValues = (word) => {
        setValues(state => ({
            ...state,
            [word.target.name]: word.target.value
        }))
    }

    const submitHandler = () => {
        if (values.description.trim() != '' && values.description.length > 0) {
            if (errors.type != 'loading') {
                setErrors({ message: 'Your post is creating...', type: 'loading' })

                let data = {
                    values,
                    token: localStorage.getItem('sessionStorage')
                }

                postService.createPost(data)
                    .then(res => {
                        if (!res.message) {
                            setValues({
                                description: '',
                                images: [],
                                select: 'Public'
                            })

                            setErrors({ message: 'You successfully created a post!', type: '' })
                            setPosts(state => [res, ...state])
                        } else {
                            setErrors({ message: res.message, type: '' })
                        }
                    })
            } else {
                setErrors({ message: 'Please wait, you already creating a post!', type: 'loading' })
            }
        } else {
            setErrors({ message: 'You must type something for description', type: '' })
        }
    }

    const uploadFile = () => {
        uploadRef.current.click()
    }

    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
            setErrors({ message: 'Uploading...', type: '' })

            let base64 = await convertBase64(file)

            let newDate = new Date()

            let date = newDate.toLocaleString()

            let imageData = {
                name: file.name,
                type: file.type,
                date,
                dataString: base64,
            }

            if (values.images.some(x => x.dataString == imageData.dataString)) {
                setErrors({ message: 'This image already exist!', type: '' })
            } else {
                if (values.images.length > 5) {
                    setErrors({ message: 'You cannot upload more than 6 images!', type: '' })
                } else {
                    setValues(state => ({
                        ...state,
                        ['images']: [...state.images, imageData]
                    }));
                }
            }
        } else {
            setErrors({ message: 'File must be a image! (png, jpeg, jpg, raw)', type: '' })
        }
        e.target.value = null
    }

    const removeImage = (e) => {
        let file = e.target.parentElement.childNodes[0].src

        setValues(state => ({
            ...state,
            ['images']: state.images.filter(x => x.dataString !== file)
        }));

        setErrors({ message: file, type: 'remove image' })
    }

    return (
        <article className="create-post">
            <div className="info">
                <div className="profile-image">
                    <img src={image != '' && image != undefined ? image : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />
                    <textarea name='description' value={values.description} onChange={(e) => changeValues(e)} placeholder="Text something here..."></textarea>
                </div>

                <div className='buttons'>
                    <button className='' onClick={() => submitHandler()}>Post</button>

                    <input type="file" style={{ display: 'none' }} onChange={(e) => addImage(e)} ref={uploadRef} />
                    <button className='' onClick={() => uploadFile()}>+ img</button>
                    <select name='select' value={values.select} onChange={(e) => changeValues(e)} >
                        <option value={'Public'}>Public</option>
                        <option value={'Friends'}>Friends</option>
                    </select>
                </div>

                <div className='inputBox-uploadImages'>
                    {values.images?.length > 0 &&
                        values.images?.map(x =>
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
        </article>
    )
}