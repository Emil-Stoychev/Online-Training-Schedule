import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import './add-program.css'

export const AddProgramComponent = () => {
    const [container, setContainer] = useState([])
    const [category, setCategory] = useState({
        option: true,
        value: ''
    })

    const handleBtns = (option) => {
        let id = uuid()
        let obj = { [option]: '', id, option }

        setContainer(state => [...state, obj])
    }

    const removeFieldFromCnt = (id) => {
        setContainer(state => state.filter(x => x.id != id))
    }

    const categoryValue = (e) => {
        setCategory(state => ({
            ...state,
            value: e.target.value
        }))
    }

    const onCreateBtnHandler = () => {
        console.log(container);
        console.log(category);
    }

    return (
        <section className='add-program'>
            <h1>Add program</h1>

            <div className='add-program-buttons'>
                <button onClick={() => handleBtns('title')}>Title + </button>
                <button onClick={() => handleBtns('description')}>Description + </button>
                <button onClick={() => handleBtns('restTime')}>Rest Time +</button>
                <button onClick={() => handleBtns('exerciseTime')}>Exercise Time +</button>
                <button onClick={() => handleBtns('image')}>Image + </button>
            </div>

            <div className='choose-category'>
                <button onClick={() => setCategory(x => ({ value: '', option: !x.option }))}>Choose category</button>

                {category.option
                    ?
                    <input value={category.value} onChange={(e) => categoryValue(e)} type='text' placeholder='Add category name' />
                    :
                    <select onChange={(e) => categoryValue(e)}>
                        <option>Body</option>
                        <option>Cardio</option>
                        <option>Outside</option>
                    </select>
                }
            </div>

            <div className='add-option'>
                {container.length > 0 &&
                    container.map((x) =>
                        x.option == 'title'
                            ?
                            <div key={x.id}>
                                <input type='text' placeholder='Exercise name' />
                                <h2 onClick={() => removeFieldFromCnt(x.id)}>&#x2715;</h2>
                            </div>
                            :
                            x.option == 'description'
                                ?
                                <div key={x.id}>
                                    <textarea placeholder='More info here'></textarea>
                                    <h2 onClick={() => removeFieldFromCnt(x.id)}>&#x2715;</h2>
                                </div>
                                :
                                x.option == 'restTime'
                                    ?
                                    <div key={x.id}>
                                        <input type='number' id='rest-time' placeholder='Rest time (optional)' />
                                        <h2 onClick={() => removeFieldFromCnt(x.id)}>&#x2715;</h2>
                                    </div>
                                    :
                                    x.option == 'image'
                                        ?
                                        <div key={x.id}>
                                            <input type='file' />
                                            <h2 onClick={() => removeFieldFromCnt(x.id)}>&#x2715;</h2>
                                        </div>
                                        :
                                        x.option == 'exerciseTime' &&
                                        <div key={x.id}>
                                            <input type='number' id='exercise-time' placeholder='Exercise time (optional)' />
                                            <h2 onClick={() => removeFieldFromCnt(x.id)}>&#x2715;</h2>
                                        </div>
                    )
                }
            </div>

            <button className='last-btn' onClick={() => onCreateBtnHandler()}>Create</button>

        </section>
    )
}