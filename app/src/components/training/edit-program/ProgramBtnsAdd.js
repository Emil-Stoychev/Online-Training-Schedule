import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as trainingService from '../../../services/trainingService.js'

export const ProgramBtnsAdd = ({ userId, setCategory, category, setContainer, setVisible, visible, setPrice, price }) => {
    let [allCategories, setAllCategories] = useState([])

    const handleBtns = (option) => {
        let id = uuid()
        let obj = option == 'image' ? { [option]: [], option, _id: id, new: true } : { [option]: '', option, _id: id, new: true }

        setContainer(state => [...state, obj])
    }

    const categoryValue = (e) => {
        setCategory(state => ({
            ...state,
            value: e.target.value
        }))
    }

    useEffect(() => {
        trainingService.getAllCategories(userId)
            .then(res => {
                if (!res.message) {
                    setAllCategories(res)
                }
            })
    }, [category.option])

    const visibleHandler = (e) => {
        setVisible({ value: e.target.value })
    }

    return (
        <>
            <div className='add-program-buttons'>
                <button onClick={() => handleBtns('title')}>Title + </button>
                <button onClick={() => handleBtns('description')}>Description + </button>
                <button onClick={() => handleBtns('restTime')}>Rest Time +</button>
                <button onClick={() => handleBtns('exerciseTime')}>Exercise Time +</button>
                <button onClick={() => handleBtns('image')}>Image + </button>
                <button onClick={!price.option ? () => setPrice({ value: '', option: true, currency: 'BGN' }) : (e) => (e)}>Price</button>
            </div>

            <div className='choose-category'>
                <button onClick={() => setCategory(x => ({ value: '', option: !x.option }))}>Choose category</button>

                {!category.option
                    ?
                    <input minLength='1' maxLength='21' value={category.value} onChange={(e) => categoryValue(e)} type='text' placeholder='Add category name' />
                    :
                    <select onChange={(e) => categoryValue(e)}>
                        {allCategories.map(x => <option key={x._id}>{x.category}</option>)}
                    </select>
                }

                <select value={visible.value} onChange={(e) => visibleHandler(e)}>
                    <option value='Public' >Public</option>
                    <option value='Friends' >Friends</option>
                    <option value='Private' >Private</option>
                </select>
            </div>
        </>
    )
}