import './notes.css'

export const NotesComponent = () => {
    return (
        <article className='notes-category'>
            <h2>Body <i className="fa-solid fa-eye"></i></h2>
            <hr />

            <article className='notes'>
                <div>
                    <h2>Gorna chast</h2>

                    <h3>+</h3>
                </div>

                <time>26.12.2022</time>
                <p className='notes-private-p'>Private</p>

                <div className='notes-more'>

                    <div className='notes-more-buttons'>
                        <i className="fa-solid fa-eye"></i>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <i className="fa-solid fa-trash"></i>
                    </div>

                    <div className='info'>
                        <h2>Gurdi</h2>
                        <hr />

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an</p>
                    </div>

                    <div className='info'>
                        <h2>Grub</h2>
                        <hr />

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an</p>
                    </div>

                    <div className='info'>
                        <h2>Biceps</h2>
                        <hr />

                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an</p>
                    </div>

                </div>

            </article>

            <article className='notes'>
                <div>
                    <h2>Korem</h2>

                    <h3>+</h3>
                </div>

                <time>26.12.2022</time>
                <p className='notes-public-p'>Public</p>
            </article>
        </article>
    )
}