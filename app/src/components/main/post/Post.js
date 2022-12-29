import { CommentComponent } from './comments/Comment'
import './post.css'

export const PostComponent = () => {
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
                    <div className='sliders'>
                        <button>&#8810;</button>
                        <button>&#8811;</button>
                    </div>
                    <img src='https://cdna.4imprint.com/qtz/homepage/categories/images21/drinkware0222.jpg'></img>
                </div>

                <div className='buttons'>
                    <i className="fa-solid fa-heart"></i>
                    <i className="fa-sharp fa-solid fa-comments"></i>
                    <i className="fa-solid fa-sd-card"></i>
                    <i className="fa-solid fa-trash"></i>
                </div>

                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>

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