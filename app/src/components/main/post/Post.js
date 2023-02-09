import { useEffect, useState } from 'react'
import { CommentComponent } from './comments/Comment'
import './post.css'

import useGlobalErrorsHook from '../../../hooks/useGlobalErrors'

import * as postService from '../../../services/postService.js'
import { useNavigate } from 'react-router-dom'
import { AddCommentComponent } from './addComment/AddComment'
import { EditPostComponent } from './editPost/EditPost'
import { LoadingPostTemplate } from './LoadingPostTemplate'

const PostComponent = ({ x, userId, token, image, setPosts }) => {
    const [post, setPost] = useState({})
    const [imageCount, setImageCount] = useState(0)
    const [showComments, setShowComments] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false)
    const [toggleEditPost, setToggleEditPost] = useState({
        option: false,
        description: '' || post?.description,
        images: [],
        select: 'Public'
    })
    const navigate = useNavigate()

    let [errors, setErrors] = useGlobalErrorsHook()

    useEffect(() => {
        if (x) {
            setPost(x)
        } else {
            postService.getPostById(window.location.pathname.split('/post/')[1], localStorage.getItem('sessionStorage'))
                .then(res => {
                    setPost(res)
                })
        }
    }, [])

    const onLikeHandler = (e, postId) => {

        if (post?.author != userId) {
            if (!e.currentTarget.className.includes('liked')) {
                e.currentTarget.className = 'fa-solid fa-heart liked'
                setErrors({ message: 'Liked', type: '' })
            } else {
                e.currentTarget.className = 'fa-solid fa-heart'
                setErrors({ message: 'Unliked', type: '' })
            }
        }

        postService.toggleLikePost({ postId, token: localStorage.getItem('sessionStorage') })
            .then(res => {
                if (!res.message) {
                    setPost(state => ({
                        ...state,
                        likes: res.likes
                    }))
                } else {
                    setErrors({ message: res.message, type: '' })
                    console.log(res);
                }
            })
    }

    const onSaveHandler = (e, postId) => {

        if (post?.author != userId) {
            if (!e.currentTarget.className.includes('saved')) {
                e.currentTarget.className = 'fa-solid fa-sd-card saved'
                setErrors({ message: 'Saved', type: '' })
            } else {
                e.currentTarget.className = 'fa-solid fa-sd-card'
                setErrors({ message: 'Remove', type: '' })
            }
        }

        postService.toggleSavePost({ postId, token: localStorage.getItem('sessionStorage') })
            .then(res => {
                if (!res.message) {
                    setPost(state => ({
                        ...state,
                        saved: res.saved
                    }))
                } else {
                    setErrors({ message: res.message, type: '' })
                    console.log(res);
                }
            })
    }

    const onDeleteHandler = (e, postId) => {
        if (errors.type != 'loading') {
            setErrors({ message: 'Deleting...', type: 'loading' })

            postService.deletePost(postId, token)
                .then(res => {
                    console.log(res);
                    if (!res.message) {
                        setErrors({ message: 'You successfully deleted this post!', type: '' })

                        setTimeout(() => {
                            if (!window.location.pathname.split('/post/')[1]) {
                                setPosts(state => state.filter(x => x._id != postId))
                            } else {
                                navigate('/profile')
                            }
                        }, 0);
                    } else {
                        setErrors({ message: res.message, type: '' })
                    }
                })
        }
    }

    const getComments = () => {
        if (post?.comments?.length > 0) setErrors({ message: 'Loading comments...', type: 'loading' })

        postService.getComments(post?._id, token)
            .then(res => {
                setShowComments(true)

                setPost(state => ({
                    ...state,
                    comments: res
                }))
            })
    }

    const submitEditPost = () => {
        if (errors.type == 'loading') return

        setErrors({ message: 'Editing, please wait...', type: 'loading' })

        postService.editPost(toggleEditPost, post?._id, token)
            .then(res => {
                if (!res.message) {
                    setErrors({ message: 'You successfully edit this post!', type: '' })

                    setPost(state => ({
                        ...state,
                        description: res.description,
                        images: res.images,
                        visible: res.select
                    }))

                    setToggleEditPost({
                        option: false,
                        description: '' || post?.description,
                        images: [],
                        select: 'Public'
                    })
                } else {
                    setErrors({ message: res?.message, type: '' })
                }
            })
    }

    const nextImage = () => {
        if (imageCount > post?.images?.length - 2) {
            setImageCount(0)
        } else {
            setImageCount(state => state + 1)
        }
    }

    const previousImage = () => {
        if (imageCount < 1) {
            setImageCount(post?.images?.length - 1)
        } else {
            setImageCount(state => state - 1)
        }
    }

    return (
        <>
            {post._id ?
                <>
                    <div className="post">
                        <div className="profile">
                            <div className='post-info' onClick={() => navigate(`/profile/${post?.author}`)}>
                                <img src={post?.profileImage?.length > 0 &&
                                    post?.profileImage[0]?.image != ''
                                    ? post?.profileImage[0]?.image
                                    : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />
                                <div>
                                    <h3>{post?.profileImage?.length > 0 ? post?.profileImage[0]?.username : ''}</h3>
                                    <p>{post?.profileImage?.length > 0 ? post?.profileImage[0]?.location : ''}</p>
                                </div>
                            </div>

                            <div>
                                {post?.author == userId ?
                                    toggleEditPost.option
                                        ?
                                        <>
                                            <button className='editPostOptionBtn' onClick={() => submitEditPost()}>✓</button>
                                            <button className='editPostOptionBtn' onClick={() => setToggleEditPost(x => ({ ...x, option: false }))}>X</button>
                                        </>
                                        :
                                        <i onClick={() => setToggleEditPost(x => ({
                                            option: true,
                                            description: post?.description,
                                            images: post?.images,
                                            select: post?.visible
                                        }))} className="fa-solid fa-pen-to-square"></i>
                                    : ''}
                            </div>
                        </div>

                        {post?.images?.length > 0 && !toggleEditPost.option &&
                            <div className='images'>
                                {post?.images?.length > 1 &&
                                    <div className='sliders'>
                                        <button onClick={() => previousImage()}>&#8810;</button>
                                        <button onClick={() => nextImage()}>&#8811;</button>
                                    </div>
                                }
                                {post?.images?.length > 0 &&
                                    <div className='images-image'>
                                        <img key={post?.images[imageCount]?._id} src={post?.images[imageCount]?.dataString} />
                                    </div>
                                }
                            </div>
                        }


                        {toggleEditPost.option
                            ? <EditPostComponent toggleEditPost={toggleEditPost} setToggleEditPost={setToggleEditPost} submitEditPost={submitEditPost} />
                            : <p>{post?.description}</p>
                        }



                        {!toggleEditPost.option && <div className='buttons'>
                            <i onClick={(e) => onLikeHandler(e, post?._id)} className={`fa-solid fa-heart ${post?.likes?.includes(userId) && 'liked'}`}>{post?.likes?.length}</i>
                            <i className="fa-sharp fa-solid fa-comments">{post?.comments?.length}</i>
                            <i onClick={(e) => onSaveHandler(e, post?._id)} className={`fa-solid fa-sd-card ${post?.saved?.includes(userId) && 'saved'}`}>{post?.saved?.length}</i>

                            {post?.author == userId &&
                                <>
                                    {toggleDelete
                                        ?
                                        <>
                                            <button className='deleteOptionBtn' onClick={(e) => onDeleteHandler(e, post?._id)}>✓</button>
                                            <button className='deleteOptionBtn' onClick={() => setToggleDelete(false)}>X</button>
                                        </>
                                        :
                                        <i onClick={() => setToggleDelete(true)} className="fa-solid fa-trash"></i>
                                    }
                                </>
                            }
                        </div>}

                        {!toggleEditPost.option && <div className='comment-main-title'>
                            <hr />
                            <h2>COMMENTS</h2>
                        </div>}

                        {!toggleEditPost.option && <div className='comments'>

                            <AddCommentComponent userId={userId} token={token} post={post} setPost={setPost} showComments={showComments} image={image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} />

                            {post?.comments?.length > 0 && showComments
                                ?
                                <>
                                    <p onClick={() => setShowComments(false)} className='showComments'>Hide comments: {post?.comments?.length}</p>

                                    {post?.comments?.map(x => <CommentComponent key={x?._id} x={x} token={token} userId={userId} setPost={setPost} />)}
                                </>
                                :
                                <p onClick={() => getComments()} className='showComments'>Show comments: {post?.comments?.length}</p>
                            }

                        </div>}
                    </div>

                    <hr />
                </>
                :
                <LoadingPostTemplate />
            }
        </>
    )
}

export default PostComponent