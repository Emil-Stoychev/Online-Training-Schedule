import './add-program.css'

export const AddProgramComponent = () => {
    return (
        <section className='add-program'>
            <h1>Add program</h1>

            <div className='add-program-buttons'>
                <button>Title + </button>
                <button>Description + </button>
                <button>Rest Time +</button>
                <button>Exercise Time +</button>
                <button>Image + </button>
            </div>

            <div className='choose-category'>
                <button>Choose category</button>
                <input type='text' placeholder='Add category name' />

                {/* <select>
                    <option>Body</option>
                    <option>Cardio</option>
                    <option>Outside</option>
                </select> */}
            </div>

            <div className='add-option'>
                <div>
                    <input type='text' placeholder='Exercise name' />
                    <h2>&#x2715;</h2>
                </div>

                <div>
                    <input type='file' />
                    <h2>&#x2715;</h2>
                </div>

                <div>
                    <textarea placeholder='More info here'></textarea>
                    <h2>&#x2715;</h2>
                </div>

                <div>
                    <input type='number' id='rest-time' placeholder='Rest time (optional)' />
                    <h2>&#x2715;</h2>
                </div>

                <div>
                    <input type='number' id='exercise-time' placeholder='Exercise time (optional)' />
                    <h2>&#x2715;</h2>
                </div>
            </div>

            <button className='last-btn'>Create</button>

        </section>
    )
}