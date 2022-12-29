import "./main.css";

import { CreatePost } from "./create-post/CreatePost";
import { PostComponent } from "./post/Post";

export const MainComponent = () => {
    return (
        <section className="container">

            <CreatePost />

            <article className="posts">

                <PostComponent />

            </article>

        </section>
    );
};
