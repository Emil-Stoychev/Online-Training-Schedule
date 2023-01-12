import { useState } from 'react'
import './addComment.css'

import * as postService from '../../../../services/postService'

export const AddCommentComponent = ({ userId, token, post, setPosts, showComments, image }) => {
    const [values, setValues] = useState({
        description: '',
        image: [],
    })

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