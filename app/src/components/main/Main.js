import { useCallback, useEffect, useRef, useState } from "react";
import "./main.css";

import { CreatePost } from "./create-post/CreatePost";
import { PostComponent } from "./post/Post";

import * as postService from '../../services/postService.js'

export const MainComponent = ({ userId, token }) => {
    const [posts, setPosts] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const [loading, setLoading] = useState(true)
    const morePosts = useRef(false)

    useEffect(() => {
        setLoading(true)

        postService.getAllPosts(pageNum)
            .then(res => {
                if (!res.message) {
                    setPosts(state => [...state, ...res])
                    morePosts.current = true
                } else {
                    morePosts.current = false
                }
                setLoading(false)
            })

    }, [pageNum])

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

            <CreatePost setPosts={setPosts} />

            <article className="posts">

                {posts.length > 0 &&
                    posts.map((x, i) => {
                        return <PostComponent key={x._id} x={x} userId={userId} token={token} />
                    })
                }

                <h1 className="loading-in-cnt">{loading && 'Loading...'}</h1>

            </article>

        </section>
    );
};
