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
                category
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

    return (
        <section className='add-program'>
            <h1>Add program</h1>

            <ProgramBtnsAdd
                setCategory={setCategory}
                category={category}
                setContainer={setContainer}
                categories={categories}
                categoriesEmpty={categoriesEmpty}
            />

            <div className='add-option'>

                {container.length > 0 && <input minLength='3' maxLength='30' ref={mainInputTitle} type='text' placeholder='Main title' />}

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

            <button className='last-btn' onClick={() => onCreateBtnHandler()}>Create</button>

        </section>
    )
}