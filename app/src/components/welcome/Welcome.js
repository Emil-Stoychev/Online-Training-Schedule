import "./welcome.css";

export const WelcomeComponent = () => {
    return (
        <section className="container">

            <article className="create-post">
                <div className="info">
                    <div className="profile-image">
                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />
                        <textarea placeholder="Text something here..."></textarea>
                    </div>

                    <div className='buttons'>
                        <button className=''>Post</button>
                        <button className=''>Add img</button>
                        <select>
                            <option>Public</option>
                            <option>Private</option>
                        </select>
                    </div>
                </div>
            </article>

            <article className="posts">

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
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>

                    <div className='images'>
                        <img src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg'></img>
                    </div>

                    <div className='buttons'>
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-sharp fa-solid fa-comments"></i>
                        <i class="fa-solid fa-sd-card"></i>
                    </div>

                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>

                    <div className='comment-main-title'>
                        <hr />
                        <h2>COMMENTS</h2>
                    </div>


                    <div className='comments'>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>

                            <div className='nested-comments'>

                                <div className='nested-comment'>
                                    <div className='top'>
                                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                        <div>
                                            <h2>Leon Pend</h2>
                                            <p>Sofia, Bulgaria</p>
                                        </div>
                                    </div>

                                    <div className='main'>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        </p>
                                    </div>

                                    <div className='buttons'>
                                        <i class="fa-solid fa-heart"></i>
                                        <i class="fa-sharp fa-solid fa-comments"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                </div>

                                <div className='nested-comment'>
                                    <div className='top'>
                                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                        <div>
                                            <h2>Leon Pend</h2>
                                            <p>Sofia, Bulgaria</p>
                                        </div>
                                    </div>

                                    <div className='main'>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        </p>
                                    </div>

                                    <div className='buttons'>
                                        <i class="fa-solid fa-heart"></i>
                                        <i class="fa-sharp fa-solid fa-comments"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                </div>

                                <div className='nested-comment'>
                                    <div className='top'>
                                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                        <div>
                                            <h2>Leon Pend</h2>
                                            <p>Sofia, Bulgaria</p>
                                        </div>
                                    </div>

                                    <div className='main'>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        </p>
                                    </div>

                                    <div className='buttons'>
                                        <i class="fa-solid fa-heart"></i>
                                        <i class="fa-sharp fa-solid fa-comments"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                    </div>
                </div>

                <hr />

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
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>

                    <div className='images'>
                        <img src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80'></img>
                    </div>

                    <div className='buttons'>
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-sharp fa-solid fa-comments"></i>
                        <i class="fa-solid fa-sd-card"></i>
                    </div>

                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>

                    <div className='comment-main-title'>
                        <hr />
                        <h2>COMMENTS</h2>
                    </div>


                    <div className='comments'>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>

                            <div className='nested-comments'>
                                <div className='nested-comment'>
                                    <div className='top'>
                                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                        <div>
                                            <h2>Leon Pend</h2>
                                            <p>Sofia, Bulgaria</p>
                                        </div>
                                    </div>

                                    <div className='main'>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        </p>
                                    </div>

                                    <div className='buttons'>
                                        <i class="fa-solid fa-heart"></i>
                                        <i class="fa-sharp fa-solid fa-comments"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                    </div>
                </div>

                <hr />

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
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>

                    <div className='images'>
                        <img src='https://cdn.shopify.com/s/files/1/2303/2711/files/2_e822dae0-14df-4cb8-b145-ea4dc0966b34.jpg?v=1617059123'></img>
                    </div>

                    <div className='buttons'>
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-sharp fa-solid fa-comments"></i>
                        <i class="fa-solid fa-sd-card"></i>
                    </div>

                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>

                    <div className='comment-main-title'>
                        <hr />
                        <h2>COMMENTS</h2>
                    </div>


                    <div className='comments'>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                        <div className='comment'>
                            <div className='top'>
                                <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />

                                <div>
                                    <h2>Leon Pend</h2>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                            </div>

                            <div className='main'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>

                            <div className='buttons'>
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-sharp fa-solid fa-comments"></i>
                                <i class="fa-solid fa-pen-to-square"></i>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>

                    </div>
                </div>

                <hr />

            </article>

        </section>
    );
};
