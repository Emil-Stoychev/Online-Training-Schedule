import { useEffect, useState } from 'react'
import { CommentComponent } from './comments/Comment'
import './post.css'

import * as postService from '../../../services/postService.js'

export const PostComponent = ({ x }) => {
    const [post, setPosts] = useState({})
    const [imageCount, setImageCount] = useState(0)

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
                    <div className='post-info'>
                        <img src={post?.profileImage?.length > 0 ? post?.profileImage[0]?.image : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />

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

                {post?.images?.length > 0
                    ?
                    <>
                        <div className='buttons'>
                            <i className="fa-solid fa-heart"></i>
                            <i className="fa-sharp fa-solid fa-comments"></i>
                            <i className="fa-solid fa-sd-card"></i>
                            <i className="fa-solid fa-trash"></i>
                        </div>

                        <p>{post?.description}</p>
                    </>
                    :
                    <>
                        <p>{post?.description}</p>

                        <div className='buttons'>
                            <i className="fa-solid fa-heart"></i>
                            <i className="fa-sharp fa-solid fa-comments"></i>
                            <i className="fa-solid fa-sd-card"></i>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </>}

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