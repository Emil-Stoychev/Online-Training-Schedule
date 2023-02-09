import { useEffect, useRef, useState } from "react";
import "./main.css";

import { CreatePost } from "./create-post/CreatePost";
import PostComponent from "./post/Post";

import * as postService from '../../services/postService.js'
import { LoadingCreatePostTemplate } from "./create-post/LoadingCreatePostTemplate";

const MainComponent = ({ userId, token, image }) => {
    const [posts, setPosts] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const [loading, setLoading] = useState(true)
    const [viewOptions, setViewOptions] = useState({
        public: true,
        friends: false,
    })
    const morePosts = useRef(false)

    const changeView = (view) => {
        setViewOptions({
            public: view == 'public' ? true : false,
            friends: view == 'friends' ? true : false,
        })

        setPageNum(0)
        setPosts([])
    }

    useEffect(() => {
        setLoading(true)

        let reqForPosts = viewOptions.public ? postService.getAllPosts(pageNum) : postService.getFriendsPosts(pageNum, token)

        reqForPosts
            .then(res => {
                if (!res.message) {
                    setPosts(state => [...state, ...res])
                    morePosts.current = true
                } else {
                    morePosts.current = false
                }
                setLoading(false)
            })
    }, [pageNum, viewOptions])

    useEffect(() => {
        window.onload = window.scrollTo(0, 0)

        window.addEventListener('scroll', handleScroll)
    }, [])

    const handleScroll = () => {
        if (morePosts.current && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPageNum(state => state + 10)
        }
    }

    return (
        <section className="container">


            {token != null ? <CreatePost setPosts={setPosts} image={image} /> : <LoadingCreatePostTemplate />}

            <article className='different-posts-options'>
                <ul role='list'>
                    <li onClick={() => changeView('public')} className={viewOptions.public ? 'active' : ''}>All posts</li>
                    <span>|</span>
                    <li onClick={() => changeView('friends')} className={viewOptions.friends ? 'active' : ''}>Only friends</li>
                </ul>
            </article>

            <hr />

            <article className="posts">

                {posts.length > 0 &&
                    posts.map((x, i) => {
                        return <PostComponent key={x._id + `${i}`} x={x} userId={userId} token={token} image={image} setPosts={setPosts} />
                    })
                }

            </article>

            {loading && <h1 className="loading-in-cnt"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></h1>}

            {posts.length == 0 && !loading && <h1 className="loading-in-cnt">{viewOptions.friends ? 'No friends posts!' : 'No posts!'}</h1>}

        </section >
    );
};

export default MainComponent