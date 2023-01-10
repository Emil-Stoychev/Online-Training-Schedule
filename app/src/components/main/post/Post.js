import { useEffect, useState } from 'react'
import { CommentComponent } from './comments/Comment'
import './post.css'

import * as postService from '../../../services/postService.js'
import { useNavigate } from 'react-router-dom'

export const PostComponent = ({ x, userId }) => {
    const [post, setPosts] = useState({})
    const [imageCount, setImageCount] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        if (x) {
            setPosts(x)
        } else {
            postService.getPostById(window.location.pathname.split('/post/')[1], localStorage.getItem('sessionStorage'))
                .then(res => {
                    setPosts(res)
                    console.log(res)
                })
        }
    }, [])

    const onLikeHandler = (e, postId) => {

        if (post?.author != userId) {
            if (!e.currentTarget.className.includes('liked')) {
                e.currentTarget.className = 'fa-solid fa-heart liked'
            } else {
                e.currentTarget.className = 'fa-solid fa-heart'
            }
        }

        postService.toggleLikePost({ postId, token: localStorage.getItem('sessionStorage') })
            .then(res => {
                if (!res.message) {
                    console.log(res);
                } else {
                    console.log(res);
                }
            })
    }

    const onSaveHandler = (e, postId) => {

        if (post?.author != userId) {
            if (!e.currentTarget.className.includes('saved')) {
                e.currentTarget.className = 'fa-solid fa-sd-card saved'
            } else {
                e.currentTarget.className = 'fa-solid fa-sd-card'
            }
        }

        postService.toggleSavePost({ postId, token: localStorage.getItem('sessionStorage') })
            .then(res => {
                if (!res.message) {
                    console.log(res);
                } else {
                    console.log(res);
                }
            })
    }

    const onDeleteHandler = (e, postId) => {
        console.log(e.currentTarget);

        // postService.toggleLikePost({ postId, token: localStorage.getItem('sessionStorage') })
        //     .then(res => {
        //         if (!res.message) {
        //             console.log(res);
        //         } else {
        //             console.log(res);
        //         }
        //     })
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
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>

                {post?.images?.length > 0 &&
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


                {post?.images?.length == 0 && <p>{post?.description}</p>}

                <div className='buttons'>
                    <i onClick={(e) => onLikeHandler(e, post?._id)} className={`fa-solid fa-heart ${post?.likes?.includes(userId) && 'liked'}`}></i>
                    <i className="fa-sharp fa-solid fa-comments"></i>
                    <i onClick={(e) => onSaveHandler(e, post?._id)} className={`fa-solid fa-sd-card ${post?.saved?.includes(userId) && 'saved'}`}></i>

                    {post?.author == userId &&
                        <i onClick={(e) => onDeleteHandler(e, post?._id)} className="fa-solid fa-trash"></i>
                    }
                </div>

                {post?.images?.length > 0 && <p>{post?.description}</p>}

                <div className='comment-main-title'>
                    <hr />
                    <h2>COMMENTS</h2>
                </div>

                <div className='comments'>

                    {post?.comments?.length > 0 &&
                        post?.comments?.map(x => <CommentComponent key={x._id} x={x} />)
                    }

                </div>
            </div>

            <hr />
        </>
    )
}