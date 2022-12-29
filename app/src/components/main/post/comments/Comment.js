import './comment.css'

export const CommentComponent = () => {
    return (
        <>
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
                    <i className="fa-solid fa-heart"></i>
                    <i className="fa-sharp fa-solid fa-comments"></i>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i className="fa-solid fa-trash"></i>
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
                            <i className="fa-solid fa-heart"></i>
                            <i className="fa-sharp fa-solid fa-comments"></i>
                            <i className="fa-solid fa-pen-to-square"></i>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}