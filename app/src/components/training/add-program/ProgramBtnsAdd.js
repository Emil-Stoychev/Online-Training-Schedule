import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const ProgramBtnsAdd = ({
    setCategory,
    category,
    setContainer,
    categories,
    categoriesEmpty,
    setVisible,
    visible
}) => {
    const handleBtns = (option) => {
        let id = uuid()
        let obj = option == 'image' ? { [id]: { [option]: [], option, id } } : { [id]: { [option]: '', option, id } }

        setContainer(state => [...state, obj])
    }

    const categoryValue = (e) => {
        setCategory(state => ({
            ...state,
            value: e.target.value
        }))
    }

    useEffect(() => {
        if (category.option == true) {
            setCategory(state => ({
                ...state,
                value: categories.length > 0 && categories[0].category
            }))
        }
    }, [category.option, categories])

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
            </div>

            <div className='choose-category'>
                <button onClick={() => setCategory(x => ({ value: '', option: !x.option }))}>
                    {!category.option
                        ? 'Choose category'
                        : (categories.length > 0
                            ? 'Create category'
                            : categoriesEmpty &&
                                !categories.length > 0 ? 'Create category' : 'Loading...')}
                </button>

                {!category.option
                    ?
                    <input minLength='1' maxLength='21' value={category.value} onChange={(e) => categoryValue(e)} type='text' placeholder='Add category name' />
                    :
                    <select value={category.value} onChange={(e) => categoryValue(e)}>
                        {categories.length > 0 && categories.map(x => <option value={x.category} key={x._id}>{x.category}</option>)}
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