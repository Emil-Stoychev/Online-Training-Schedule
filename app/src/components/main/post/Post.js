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
                .then(res => console.log(res))
        }
    }, [])

    const nextImage = () => {
        if (imageCount > x?.images?.length - 2) {
            setImageCount(0)
        } else {
            setImageCount(state => state + 1)
        }
    }

    const previousImage = () => {
        if (imageCount < 1) {
            setImageCount(x?.images?.length - 1)
        } else {
            setImageCount(state => state - 1)
        }
    }

    return (
        <>
            <div className="post">
                <div className="profile">
                    <div className='post-info'>
                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                        <div>
                            <h3>Leon Pend</h3>
                            <p>Sofia, Bulgaria</p>
                        </div>
                    </div>

                    <div>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>

                <div className='images'>
                    {x?.images?.length > 1 &&
                        <div className='sliders'>
                            <button onClick={() => previousImage()}>&#8810;</button>
                            <button onClick={() => nextImage()}>&#8811;</button>
                        </div>
                    }
                    {x?.images?.length > 0 &&
                        <img key={x?.images[imageCount]?._id} src={x?.images[imageCount]?.dataString} />
                    }
                </div>

                <div className='buttons'>
                    <i className="fa-solid fa-heart"></i>
                    <i className="fa-sharp fa-solid fa-comments"></i>
                    <i className="fa-solid fa-sd-card"></i>
                    <i className="fa-solid fa-trash"></i>
                </div>

                <p>{x?.description}</p>

                <div className='comment-main-title'>
                    <hr />
                    <h2>COMMENTS</h2>
                </div>

                <div className='comments'>

                    <CommentComponent />

                </div>
            </div>

            <hr />
        </>
    )
}