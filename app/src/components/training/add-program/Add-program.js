import { useRef, useState } from 'react'
import './add-program.css'

import * as trainingService from '../../../services/trainingService.js'

import { InputOptionsComponent } from './InputOptions';
import { ProgramBtnsAdd } from './ProgramBtnsAdd';
import useGlobalErrorsHook from '../../../hooks/useGlobalErrors';

export const AddProgramComponent = ({ token, userId, setCategories, categories, categoriesEmpty }) => {
    const [container, setContainer] = useState([])
    const [category, setCategory] = useState({
        option: true,
        value: ''
    })
    const [price, setPrice] = useState({
        option: false,
        value: '',
        currency: 'BGN'
    })
    const [visible, setVisible] = useState({
        value: 'Public'
    })

    let [errors, setErrors] = useGlobalErrorsHook()

    const mainInputTitle = useRef(null)

    const onCreateBtnHandler = () => {
        if (errors.type == 'loading') return
        if (category.value == '' || category.value.trim() != '') {
            let testInputs = false

            if (container.length > 0) {
                container.forEach(x => {
                    let curr = Object.values(x)[0]

                    if (curr.option == 'image') {
                        if (curr.image.length == 0) {
                            setErrors({ message: `You must upload at least 1 image or remove field!` })
                            testInputs = true
                            return
                        } else {
                            return
                        }
                    }

                    let currInputValue = curr?.[curr.option] == undefined ? curr?.value : curr?.[curr.option]

                    if (currInputValue.trim() == '') {
                        testInputs = true
                        setErrors({ message: `${curr.option} is required!` })
                        return
                    }
                })
            }

            if (testInputs) {
                return
            }

            setErrors({ message: 'Creating...', type: 'loading' })

            let data = {
                mainInputTitle: mainInputTitle?.current?.value,
                container,
                category,
                visible: visible.value,
            }

            if (price.option) {
                if (price.value <= 0) {
                    setErrors({ message: `Price is required!` })
                    return
                } else {
                    data.price = price.value
                    data.currency = price.currency
                }
            }

            trainingService.createProgram(token, userId, data)
                .then(res => {
                    if (!res.message) {
                        mainInputTitle.current = null
                        setContainer([])

                        if (!res?.likes) {
                            setCategories(state => [...state, res])
                        } else {
                            setCategories(state => state.find(x => x._id == res.category._id) ? state : [...state, res.category])
                        }

                        setErrors({ message: `You successfully created a ${res?.likes ? 'program' : 'category'}!`, type: '' })
                    } else {
                        setErrors({ message: res.message, type: '' })
                    }
                })
        } else {
            setErrors({ message: 'Choose category or create one!', type: '' })
        }
    }

    const priceValueHandler = (e) => {
        let vl = e.currentTarget.value

        if (vl != 'BGN' && vl != 'EURO' && vl != 'USD') {
            setPrice(state => ({ value: vl, option: state.option, currency: state.currency }))
        } else {
            setPrice(state => ({ value: state.value, option: state.option, currency: vl }))
        }
    }

    return (
        <section className='add-program'>
            <h1>Add program</h1>

            <ProgramBtnsAdd
                setCategory={setCategory}
                category={category}
                setContainer={setContainer}
                categories={categories}
                categoriesEmpty={categoriesEmpty}
                setVisible={setVisible}
                visible={visible}
                setPrice={setPrice}
                price={price}
            />

            <div className='add-option'>

                {container.length > 0 && <input className='add-option-main-title' minLength='3' maxLength='30' ref={mainInputTitle} type='text' placeholder='Main title' />}

                {container.length > 0 &&
                    container.map((x) =>
                        <InputOptionsComponent
                            key={Object.values(x)[0]?.id}
                            current={Object.values(x)[0]}
                            setContainer={setContainer}
                            container={container}
                        />
                    )
                }
            </div>

            {price.option &&
                <div className='price-input-optional'>
                    <input minLength='0' value={price.value} onChange={(e) => priceValueHandler(e)} type='number' placeholder='Price' />

                    <select value={price.currency} onChange={(e) => priceValueHandler(e)}>
                        <option value='BGN' >BGN</option>
                        <option value='EURO' >EURO</option>
                        <option value='USD' >USD</option>
                    </select>
                    <h2 onClick={() => setPrice({ value: '', option: false, currency: '' })}>&#x2715;</h2>
                </div>
            }

            <button className='last-btn' onClick={() => onCreateBtnHandler()}>Create</button>

        </section >
    )
}