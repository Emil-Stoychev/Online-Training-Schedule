import { useRef, useState } from 'react'
import * as postService from '../../../../services/postService.js'
import './comment.css'

export const CommentComponent = ({ x, token, userId, setPosts }) => {
    const [showComments, setShowComments] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false)
    const [nestedToggleDelete, setNestedToggleDelete] = useState(false)
    const [toggleReply, setToggleReply] = useState({
        option: false,
        value: ''
    })
    const [toggleEdit, setToggleEdit] = useState({
        option: false,
        value: ''
    })
    const [nestedToggleEdit, setNestedToggleEdit] = useState({
        option: false,
        value: ''
    })
    const desc = useRef()
    const nestedDesc = useRef()

    const getNestedComments = (postId, commentId) => {
        setShowComments(true)

        postService.getNestedComments(postId, commentId, token)
            .then(res => {
                setShowComments(true)

                console.log(res)

                setPosts(state => ({
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

    const deleteComment = (commentId, parentId) => {
        postService.deleteComment(commentId, token, parentId)
            .then(res => {
                if (!res.message) {
                    if (parentId == undefined) {
                        setPosts(state => ({
                            ...state,
                            comments: state.comments.filter(x => x._id != commentId)
                        }))
                    } else {
                        setPosts(state => ({
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
        setNestedToggleDelete(false)
        setToggleDelete(false)
    }

    const likeComment = (commentId, option, parentId) => {

        postService.likeComment({ commentId, token })
            .then(res => {
                setPosts(state => ({
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

    const editNestedValueHandler = (e) => {
        setNestedToggleEdit(oldState => ({
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

    const editNestedCommentHandler = () => {
        setToggleEdit(state => ({
            option: !state.option,
            value: state.option ? '' : nestedDesc.current.innerHTML
        }))
    }

    const updateComment = (commentId, option, parentId) => {
        if (toggleEdit.value.trim() != '' || toggleEdit.value.length > 3) {
            postService.editComment(toggleEdit.value, commentId, token)
                .then(res => {
                    if (!res.message) {
                        setPosts(state => ({
                            ...state,
                            comments: state.comments.map(c => {
                                if (option == 'main') {
                                    if (c?._id == commentId && c?.authorId == userId) {
                                        c.description = res.description
                                    }
                                    return c
                                } else {
                                    if (c?._id == parentId && c?.authorId == userId) {
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

                        setToggleEdit(oldState => ({
                            ...oldState,
                            option: false
                        }))
                    }
                })
        } else {
            setToggleEdit({
                option: false,
                value: ''
            })
        }
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

        console.log('clicked');

        postService.addReplyComment(data)
            .then(res => console.log(res))
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
                            <input type='text' value={toggleEdit.value} onChange={editValueHandler} />
                            <button className='editOptionBtn' onClick={() => updateComment(x?._id, 'main', undefined)}>✓</button>
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


                    {toggleReply.option
                        ?
                        <>
                            <input type='text' value={toggleReply.value} onChange={addNestedHandler} />
                            <button onClick={() => onReplyClick(x._id)} className='deleteOptionBtn'>✓</button>
                            <button onClick={() => setToggleReply({ option: false, value: '' })} className='deleteOptionBtn'>X</button>
                        </>
                        : <i onClick={() => setToggleReply({ option: true, value: '' })} className="fa-solid fa-reply"></i>
                    }
                </div>

                {x?.nestedComments?.length > 0 && showComments
                    ?
                    <>
                        <p onClick={() => setShowComments(false)} className='showComments'>Hide nested comments: {x?.nestedComments?.length}</p>

                        <div className='nested-comments'>

                            {x?.nestedComments?.map((y, i) =>
                                <div className='nested-comment' key={y._id + `${i}`}>
                                    <div className='top'>
                                        <img src={y?.profileImage?.length > 0 &&
                                            y?.profileImage[0]?.image != ''
                                            ? y?.profileImage[0]?.image
                                            : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />
                                        <div>
                                            <h2>{y?.username}</h2>
                                            <p>{y?.location}</p>
                                        </div>
                                    </div>

                                    <div className='main'>
                                        {toggleEdit.option
                                            ?
                                            <>
                                                <input type='text' value={nestedToggleEdit.value} onChange={editNestedValueHandler} />
                                                <button className='editOptionBtn' onClick={() => updateComment(y?._id, 'nested', x._id)}>✓</button>
                                                <button className='editOptionBtn' onClick={() => editNestedCommentHandler()}>X</button>
                                            </>
                                            : <p ref={nestedDesc}>{y?.description}</p>
                                        }
                                    </div>

                                    <div className='buttons'>
                                        <i onClick={() => likeComment(y?._id, 'nested', x?._id)} className={`fa-solid fa-heart ${y?.likes?.includes(userId) && 'liked'}`}>{y?.likes?.length}</i>

                                        {y?.authorId == userId &&
                                            <>
                                                <i onClick={() => editCommentHandler()} className="fa-solid fa-pen-to-square"></i>

                                                {nestedToggleDelete ?
                                                    <>
                                                        <button onClick={() => deleteComment(y._id, x._id)} className='deleteOptionBtn'>✓</button>
                                                        <button onClick={() => setNestedToggleDelete(false)} className='deleteOptionBtn'>X</button>
                                                    </>
                                                    :
                                                    <i onClick={() => setNestedToggleDelete(x => !x)} className="fa-solid fa-trash"></i>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
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