import './training-post.css'

export const TrainingPostComponent = () => {
    return (
        <div className='training-post'>

            <h1>Example title</h1>

            <hr />

            <div className='training-post-btns'>
                <i className="fa-solid fa-heart"></i>
                <i className="fa-solid fa-pen-to-square"></i>
                <i className="fa-solid fa-trash"></i>
            </div>

            <div className='training-post-main'>

                <h2>Title</h2>

                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis adipisci expedita totam voluptatem, beatae commodi, porro exercitationem debitis quae, perferendis deserunt alias earum rem ea molestiae veritatis illo sit cum.
                </p>

                <p>
                    Rest time: <span>01:30</span>
                </p>

                <div className='training-post-main-images'>
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <h2 className='add-training-image'>+</h2>
                </div>

                <h2>Title</h2>

                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis adipisci expedita totam voluptatem, beatae commodi, porro exercitationem debitis quae, perferendis deserunt alias earum rem ea molestiae veritatis illo sit cum.
                </p>

                <p>
                    Exercise time: <span>00:45</span>
                </p>

                <p>
                    Rest time: <span>01:00</span>
                </p>

                <h2>Title</h2>

                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis adipisci expedita totam voluptatem, beatae commodi, porro exercitationem debitis quae, perferendis deserunt alias earum rem ea molestiae veritatis illo sit cum.
                </p>

                <p>
                    Rest time: <span>01:30</span>
                </p>

                <div className='training-post-main-images'>
                    <img src="https://www.muscleandfitness.com/wp-content/uploads/2019/01/lifting-weights-with-headphones-615883260.jpg?w=1109&quality=86&strip=all" alt="" />
                    <h2 className='add-training-image'>+</h2>
                </div>
            </div>

        </div >
    )
}