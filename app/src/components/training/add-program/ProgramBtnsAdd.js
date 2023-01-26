import { v4 as uuid } from 'uuid';

export const ProgramBtnsAdd = ({ setCategory, category, setContainer }) => {

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
        </>
    )
}