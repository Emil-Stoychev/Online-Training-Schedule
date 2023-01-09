import { useEffect, useRef, useState } from "react";
import "./main.css";

import { CreatePost } from "./create-post/CreatePost";
import { PostComponent } from "./post/Post";

import * as postService from '../../services/postService.js'

export const MainComponent = () => {
    const [posts, setPosts] = useState([])
    const [pageNum, setPageNum] = useState(0)

    useEffect(() => {
        postService.getAllPosts(pageNum)
            .then(res => {
                if (!res.message) {
                    console.log(res);
                    setPosts(state => [...state, ...res])
                }
            })
    }, [pageNum])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight - 300) {
            setTimeout(() => {
                setPageNum(state => state + 10)
            }, 500);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className="container">

            <CreatePost setPosts={setPosts} />

            <article className="posts">

                {posts.length > 0 &&
                    posts.map((x, i) => {
                        return <PostComponent key={x._id} x={x} />
                    })
                }

            </article>

        </section>
    );
};
