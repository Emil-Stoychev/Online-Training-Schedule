import { useRef, useState } from 'react'
import './editPost.css'

import { convertBase64, imageTypes } from '../../../../utils/AddRemoveImages.js'

export const EditPostComponent = ({ toggleEditPost, setToggleEditPost, submitEditPost }) => {
    const [errors, setErrors] = useState()
    const uploadRef = useRef(null)

    const editPostValues = (e) => {
        setToggleEditPost(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
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

            if (toggleEditPost.images.some(x => x.dataString == imageData.dataString)) {
                if (errors !== 'This image already exist!') {
                    setErrors('This image already exist!')

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                if (toggleEditPost.images.length > 5) {
                    if (errors !== 'You cannot upload more than 6 images!') {
                        setErrors('You cannot upload more than 6 images!')

                        setTimeout(() => {
                            setErrors('')
                        }, 2000);
                    }
                } else {
                    setToggleEditPost(state => ({
                        ...state,
                        ['images']: [...state.images, imageData]
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
        let file = e.target.parentElement.childNodes[0].src

        setToggleEditPost(state => ({
            ...state,
            ['images']: state.images.filter(x => x.dataString !== file)
        }));
    }

    return (
        <article className='edit-post'>
            <div className='info'>
                <div className="profile-image">
                    <textarea name='description' onChange={editPostValues} value={toggleEditPost.description} placeholder="Text something here..."></textarea>
                </div>

                <div className='buttons'>
                    <input type="file" style={{ display: 'none' }} onChange={(e) => addImage(e)} ref={uploadRef} />
                    <button className='' onClick={() => uploadFile()}>+ img</button>
                    <select name='select' value={toggleEditPost.select} onChange={(e) => editPostValues(e)} >
                        <option value={'Public'}>Public</option>
                        <option value={'Friends'}>Friends</option>
                    </select>
                </div>

                <div className='inputBox-uploadImages'>
                    {toggleEditPost.images?.length > 0 &&
                        toggleEditPost.images?.map(x =>
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