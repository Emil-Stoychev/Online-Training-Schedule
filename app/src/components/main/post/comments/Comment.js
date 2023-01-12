import { useRef, useState } from 'react'
import * as postService from '../../../../services/postService.js'
import './comment.css'
import { NestedCommentComponent } from './NestedComments.js'

export const CommentComponent = ({ x, token, userId, setPost }) => {
    const [showComments, setShowComments] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false)
    const [toggleReply, setToggleReply] = useState({
        option: false,
        value: ''
    })
    const [toggleEdit, setToggleEdit] = useState({
        option: false,
        value: ''
    })
    const desc = useRef()

    const getNestedComments = (postId, commentId) => {
        setShowComments(true)

        postService.getNestedComments(postId, commentId, token)
            .then(res => {
                setShowComments(true)

                setPost(state => ({
                    ...state,
                    comments: state.comments.map(x => {
                        if (x._id == commentId) {
                            x.nestedComments = res
                        }

                        return x
                    })
                }))
            })
    }

    const deleteComment = (commentId, parentId, setNestedToggleDelete) => {
        postService.deleteComment(commentId, token, parentId)
            .then(res => {
                if (!res.message) {
                    if (parentId == undefined) {
                        setPost(state => ({
                            ...state,
                            comments: state.comments.filter(x => x._id != commentId)
                        }))
                    } else {
                        setPost(state => ({
                            ...state,
                            comments: state.comments.map(c => {
                                if (c?._id == parentId) {
                                    c.nestedComments = c.nestedComments.filter(x => x._id != commentId)
                                }

                                return c
                            })
                        }))
                    }
                }
            })
        if (setNestedToggleDelete != undefined) setNestedToggleDelete(false)
        setToggleDelete(false)
    }

    const likeComment = (commentId, option, parentId) => {

        postService.likeComment({ commentId, token })
            .then(res => {
                setPost(state => ({
                    ...state,
                    comments: state.comments.map(c => {
                        if (option == 'main') {
                            if (c?._id == commentId && c?.authorId != userId) {
                                if (c?.likes.includes(userId)) {
                                    c.likes = c.likes.filter(x => x != userId)
                                } else {
                                    c?.likes.push(userId)
                                }
                            }
                            return c
                        } else {
                            if (c?._id == parentId && c?.authorId != userId) {
                                c.nestedComments = c.nestedComments.map(x => {
                                    if (x._id == commentId && x.authorId != userId) {
                                        if (x?.likes.includes(userId)) {
                                            x.likes = x.likes.filter(x => x != userId)
                                        } else {
                                            x?.likes.push(userId)
                                        }
                                    }

                                    return x
                                })
                            }
                            return c
                        }
                    })
                }))
            })
    }

    const editValueHandler = (e) => {
        setToggleEdit(oldState => ({
            ...oldState,
            value: e.target.value
        }))
    }

    const addNestedHandler = (e) => {
        setToggleReply(oldState => ({
            ...oldState,
            value: e.target.value
        }))
    }

    const editCommentHandler = () => {
        setToggleEdit(state => ({
            option: !state.option,
            value: state.option ? '' : desc.current.innerHTML
        }))
    }

    const updateComment = (commentId, option, parentId, commentValue, setNestedToggleEdit) => {

        let word = commentValue == undefined || commentValue == '' ? toggleEdit.value : commentValue

        if (word.trim() != '' || word.length > 3) {
            postService.editComment(word, commentId, token)
                .then(res => {
                    if (!res.message) {
                        setPost(state => ({
                            ...state,
                            comments: state.comments.map(c => {
                                if (option == 'main') {
                                    if (c?._id == commentId && c?.authorId == userId) {
                                        c.description = res.description
                                    }
                                    return c
                                } else {
                                    if (c?._id == parentId) {
                                        c.nestedComments = c.nestedComments.map(x => {
                                            if (x?._id == commentId && x?.authorId == userId) {
                                                x.description = res.description
                                            }

                                            return x
                                        })
                                    }
                                    return c
                                }
                            })
                        }))
                    }
                })
        }
        if (setNestedToggleEdit) setNestedToggleEdit({ value: '', option: false })

        setToggleEdit({
            option: false,
            value: ''
        })
    }

    const onReplyClick = (commentId) => {

        let data = {
            commentValue: toggleReply.value,
            image: '',
            commentId,
            userId,
            postId: x.postId,
            token
        }

        postService.addReplyComment(data)
            .then(res => {
                if (!res.message) {
                    setPost(state => ({
                        ...state,
                        comments: state.comments.map(x => {
                            if (x._id == commentId) {
                                x.nestedComments.push(res)
                            }

                            return x
                        })
                    }))
                }
                setToggleReply({
                    option: false,
                    value: ''
                })
            })
    }

    return (
        <>
            <div className='comment'>
                <div className='top'>
                    <img src={x?.profileImage?.length > 0 &&
                        x?.profileImage[0]?.image != ''
                        ? x?.profileImage[0]?.image
                        : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />
                    <div>
                        <h2>{x?.username}</h2>
                        <p>{x?.location}</p>
                    </div>
                </div>

                <div className='main'>
                    {toggleEdit.option
                        ?
                        <>
                            <input type='text' className='commentEditInput' value={toggleEdit.value} onChange={editValueHandler} />
                            <button className='editOptionBtn' onClick={() => updateComment(x?._id, 'main', undefined, undefined)}>✓</button>
                            <button className='editOptionBtn' onClick={() => editCommentHandler()}>X</button>
                        </>
                        : <p ref={desc}>{x?.description}</p>
                    }
                </div>

                <div className='buttons'>
                    <i onClick={() => likeComment(x?._id, 'main', undefined)} className={`fa-solid fa-heart ${x?.likes?.includes(userId) && 'liked'}`}>{x?.likes?.length}</i>

                    {x?.authorId == userId &&
                        <>
                            <i onClick={() => editCommentHandler()} className="fa-solid fa-pen-to-square"></i>

                            {toggleDelete ?
                                <>
                                    <button onClick={() => deleteComment(x._id, undefined)} className='deleteOptionBtn'>✓</button>
                                    <button onClick={() => setToggleDelete(x => false)} className='deleteOptionBtn'>X</button>
                                </>
                                :
                                <i onClick={() => setToggleDelete(x => !x)} className="fa-solid fa-trash"></i>
                            }
                        </>
                    }

                    {!toggleReply.option &&
                        <i onClick={() => setToggleReply({ option: true, value: '' })} className="fa-solid fa-reply"></i>
                    }
                </div>

                {toggleReply.option &&
                    <div className='buttons-reply'>
                        <input type='text' value={toggleReply.value} onChange={addNestedHandler} />
                        <button onClick={() => onReplyClick(x._id)} className='deleteOptionBtn'>✓</button>
                        <button onClick={() => setToggleReply({ option: false, value: '' })} className='deleteOptionBtn'>X</button>
                    </div>
                }

                {x?.nestedComments?.length > 0 && showComments
                    ?
                    <>
                        <p onClick={() => setShowComments(false)} className='showComments'>Hide nested comments: {x?.nestedComments?.length}</p>

                        <div className='nested-comments'>

                            {x?.nestedComments?.map((y, i) =>
                                <NestedCommentComponent key={x._id + `${i}`} x={x} y={y} userId={userId} updateComment={updateComment} likeComment={likeComment} deleteComment={deleteComment} />
                            )}

                        </div>
                    </>
                    :
                    <p onClick={() => getNestedComments(x?.postId, x?._id)} className='showComments'>Show nested comments: {x?.nestedComments?.length}</p>
                }
            </div>
        </>
    )
}