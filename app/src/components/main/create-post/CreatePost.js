import './create-post.css'

export const CreatePost = () => {
    return (
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
                        <option>Friends</option>
                    </select>
                </div>
            </div>
        </article>
    )
}