import "./main.css";

import { CreatePost } from "./create-post/CreatePost";
import { PostComponent } from "./post/Post";

import * as postService from '../../services/postService.js'
import { useState } from "react";

export const MainComponent = () => {
    const [posts, setPosts] = useState([])

    postService.getAllPosts()
        .then(res => {
            if (!res.message) {
                setPosts(res)
            }
        })

    return (
        <section className="container">

            <CreatePost />

            <article className="posts">

                {posts.length > 0 &&
                    posts.map(x => <PostComponent key={x._id} x={x} />)
                }

            </article>

        </section>
    );
};
