import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import './add-program.css'

import { convertBase64, imageTypes } from '../../../utils/AddRemoveImages.js'

export const AddProgramComponent = () => {
    const [container, setContainer] = useState([])
    const [category, setCategory] = useState({
        option: true,
        value: ''
    })

    const handleBtns = (option) => {
        let id = uuid()
        let obj = option == 'image' ? { [id]: { [option]: [], option, id } } : { [id]: { [option]: '', option, id } }

        setContainer(state => [...state, obj])
    }

    const removeFieldFromCnt = (id) => {
        setContainer(state => state.filter(x => Object.values(x)[0]?.id != id))
    }

    const categoryValue = (e) => {
        setCategory(state => ({
            ...state,
            value: e.target.value
        }))
    }

    const cntValueHandler = (e, id, option) => {
        setContainer(state => state.map((x) => {
            if (Object.values(x)[0]?.id == id && option != 'image') {
                x = { [id]: { value: e.target.value, id, option } }
            }

            return x
        })
        )
    }

    const onCreateBtnHandler = () => {
        console.log(container);
        console.log(category);
    }

    const addImage = async (e, id, option) => {
        let file = e.target.files[0]
        let imageID = uuid()

        if (file && imageTypes.includes(file.type)) {
            let base64 = await convertBase64(file)

            setContainer(state => state.map((x) => {
                if (Object.values(x)[0]?.id == id && option == 'image') {
                    if (Object.values(x)[0]?.image?.length < 6) {
                        x = { [id]: { image: [...Object.values(x)[0]?.image, { id: imageID, data: base64 }], id, option } }
                    }
                }

                return x
            }))
        }
    }

    const removeImage = (e, id, option) => {
        let file = e.target.parentElement.childNodes[0].src

        setContainer(state => state.map((x) => {
            if (Object.values(x)[0]?.id == id && option == 'image') {
                x = { [id]: { image: Object.values(x)[0]?.image.filter(y => y.data != file), id, option } }
            }

            return x
        }))
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
                        Object.values(x)[0]?.option == 'title'
                            ?
                            <div key={Object.values(x)[0]?.id}>
                                <input minLength='3' maxLength='16' value={container[Object.values(x)[0]?.id]?.value} onChange={(e) => cntValueHandler(e, Object.values(x)[0]?.id, Object.values(x)[0]?.option)} type='text' placeholder='Exercise name' />
                                <h2 onClick={() => removeFieldFromCnt(Object.values(x)[0]?.id)}>&#x2715;</h2>
                            </div>
                            :
                            Object.values(x)[0]?.option == 'description'
                                ?
                                <div key={Object.values(x)[0]?.id}>
                                    <textarea minLength='3' maxLength='100' onChange={(e) => cntValueHandler(e, Object.values(x)[0]?.id, Object.values(x)[0]?.option)} placeholder='More info here'>{container[Object.values(x)[0]?.id]?.value}</textarea>
                                    <h2 onClick={() => removeFieldFromCnt(Object.values(x)[0]?.id)}>&#x2715;</h2>
                                </div>
                                :
                                Object.values(x)[0]?.option == 'restTime'
                                    ?
                                    <div key={Object.values(x)[0]?.id}>
                                        <input minLength='0' value={container[Object.values(x)[0]?.id]?.value} onChange={(e) => cntValueHandler(e, Object.values(x)[0]?.id, Object.values(x)[0]?.option)} type='number' id='rest-time' placeholder='Rest time' />
                                        <h2 onClick={() => removeFieldFromCnt(Object.values(x)[0]?.id)}>&#x2715;</h2>
                                    </div>
                                    :
                                    Object.values(x)[0]?.option == 'image'
                                        ?
                                        <div key={Object.values(x)[0]?.id} className='image-cnt'>
                                            <div className='image-input-file'>
                                                <input onChange={(e) => addImage(e, Object.values(x)[0]?.id, Object.values(x)[0]?.option)} type='file' />
                                                <h6>Max 6 images!</h6>
                                                <h2 onClick={() => removeFieldFromCnt(Object.values(x)[0]?.id)}>&#x2715;</h2>
                                            </div>

                                            <div className='inputBox-uploadImages'>
                                                {Object.values(x)[0]?.image.length > 0 &&
                                                    Object.values(x)[0]?.image?.map(y =>
                                                        <div key={y.id}>
                                                            <img src={y.data} />
                                                            <input
                                                                className="inputBox-UploadImage-Btn"
                                                                type="button"
                                                                value="X"
                                                                onClick={(e) => removeImage(e, Object.values(x)[0]?.id, Object.values(x)[0]?.option)}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        :
                                        Object.values(x)[0]?.option == 'exerciseTime' &&
                                        <div key={Object.values(x)[0]?.id}>
                                            <input minLength='0' value={container[Object.values(x)[0]?.id]?.value} onChange={(e) => cntValueHandler(e, Object.values(x)[0]?.id, Object.values(x)[0]?.option)} type='number' id='exercise-time' placeholder='Exercise time' />
                                            <h2 onClick={() => removeFieldFromCnt(Object.values(x)[0]?.id)}>&#x2715;</h2>
                                        </div>
                    )
                }
            </div>

            <button className='last-btn' onClick={() => onCreateBtnHandler()}>Create</button>

        </section>
    )
}