import { useState } from 'react'
import './addComment.css'

import * as postService from '../../../../services/postService'
import useGlobalErrorsHook from '../../../../hooks/useGlobalErrors'

export const AddCommentComponent = ({ userId, token, post, setPost, showComments, image }) => {
    const [values, setValues] = useState({
        description: '',
        image: [],
    })

    let [errors, setErrors] = useGlobalErrorsHook()

    const changeValues = (word) => {
        setValues(state => ({
            ...state,
            [word.target.name]: word.target.value
        }))
    }

    const submitHandler = () => {
        if (values.description.trim() != '' && values.description.length > 3) {

            let data = {
                description: values.description,
                image: values.image,
                token: localStorage.getItem('sessionStorage'),
                userId,
                postId: post?._id
            }

            postService.addComment(data)
                .then(res => {
                    setPost(state => ({
                        ...state,
                        comments: [...state.comments, showComments ? res : res?._id]
                    }))

                    setErrors({ message: 'You successfully added a comment!', type: '' })

                    setValues({
                        description: '',
                        image: [],
                    })
                })
        } else {
            setErrors({ message: 'Description must be at least 3 characters!', type: '' })
        }
    }

    return (
        <div className='addComment-cnt'>
            <div className='create-comment'>
                <div className="info">
                    <div className="profile-image">
                        <img src={image != '' && image != undefined ? image : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />
                        <textarea name='description' value={values.description} onChange={(e) => changeValues(e)} placeholder="Text something here..."></textarea>
                    </div>

                    <div className='buttons'>
                        <button className='' onClick={() => submitHandler()}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}