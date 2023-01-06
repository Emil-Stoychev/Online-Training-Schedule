import './profile.css'

export const ProfileComponent = () => {
    return (
        <>

            <section className='profile-cont'>

                <article className='profile-info-up'>
                    <div>
                        <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' />
                    </div>

                    <div className='profile-info-in'>

                        <div className='profile-name'>
                            <h1>Loan Doal</h1>
                            <button>Edit</button>
                        </div>

                        <div className='profile-statistic'>
                            <h3>Posts: 24</h3>
                            <h3>Followers: 11</h3>
                            <h3>Following: 44</h3>
                        </div>

                        <div className='profile-bio'>
                            <p>Work smart, not hard!</p>
                            <p>Work...!</p>
                        </div>

                        <div className='profile-name'>
                            <button>Follow</button>
                            <button>Message</button>
                        </div>
                    </div>

                </article>

                <hr />

                <article className='profile-nav'>

                    <ul role='list'>
                        <li className='active'>Posts</li>
                        <li>Trainings</li>
                        <li>Saved</li>
                        <li>Saved Trainings</li>
                    </ul>
                </article>


                <article className='profile-info-main'>

                    <article className='profile-info-posts'>

                        {/* <h2>No posts yet!</h2> */}

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-335257.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://www.oberlo.com/media/1603957118-winning-products.jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/modern-time-pieces.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-335257.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://www.oberlo.com/media/1603957118-winning-products.jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/modern-time-pieces.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-335257.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://www.oberlo.com/media/1603957118-winning-products.jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/modern-time-pieces.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-335257.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://www.oberlo.com/media/1603957118-winning-products.jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/modern-time-pieces.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                    </article>

                    {/* <article className='profile-info-trainings'>

                        <h2>No trainings yet!</h2>

                        <div>
                            <img src='https://images.pexels.com/photos/1022692/pexels-photo-1022692.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />

                            <h2>Gorna Chast</h2>
                        </div>

                        <div>
                            <img src='' />

                            <h2>Korem</h2>
                        </div>

                        <div>
                            <img src='https://www.mensjournal.com/wp-content/uploads/mf/getty-rf_running-sprint-man-track-1280_0.jpg?w=900&h=506&crop=1&quality=86&strip=all' />

                            <h2>Cardio</h2>
                        </div>

                        <div>
                            <img src='https://images.pexels.com/photos/1022692/pexels-photo-1022692.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />

                            <h2>Gorna Chast</h2>
                        </div>

                        <div>
                            <img src='' />

                            <h2>Korem</h2>
                        </div>

                        <div>
                            <img src='https://www.mensjournal.com/wp-content/uploads/mf/getty-rf_running-sprint-man-track-1280_0.jpg?w=900&h=506&crop=1&quality=86&strip=all' />

                            <h2>Cardio</h2>
                        </div>

                    </article> */}


                    {/* <article className='profile-info-posts saved'>

                        <h2>No saved posts yet!</h2>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-335257.jpg&fm=jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://www.oberlo.com/media/1603957118-winning-products.jpg' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                        <div className='posts-small'>
                            <img src='https://burst.shopifycdn.com/photos/modern-time-pieces.jpg?width=1200&format=pjpg&exif=1&iptc=1' />

                            <h2>Example title</h2>
                        </div>

                    </article> */}

                </article>

            </section>

        </>
    )
}