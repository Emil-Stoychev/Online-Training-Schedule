import { useEffect, useRef, useState } from 'react'
import './add-program.css'

import * as trainingService from '../../../services/trainingService.js'

import { InputOptionsComponent } from './InputOptions';
import { ProgramBtnsAdd } from './ProgramBtnsAdd';

export const AddProgramComponent = ({ token, userId, setCategories }) => {
    const [container, setContainer] = useState([])
    const [category, setCategory] = useState({
        option: true,
        value: ''
    })
    const [errors, setErrors] = useState(undefined)

    const mainInputTitle = useRef(null)

    const onCreateBtnHandler = () => {
        console.log(mainInputTitle?.current?.value);
        if (category.value.trim() != '') {
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

                        if (errors == undefined) {
                            setErrors(`You have successfully created a ${res?.likes ? 'program' : 'category'}!`)

                            setTimeout(() => {
                                setErrors(undefined)
                            }, 3000);
                        }
                    } else {
                        if (errors == undefined) {
                            setErrors(res.message)

                            setTimeout(() => {
                                setErrors(undefined)
                            }, 3000);
                        }
                    }
                })
        }
    }

    return (
        <section className='add-program'>
            <h1>Add program</h1>

            <ProgramBtnsAdd
                setCategory={setCategory}
                category={category}
                setContainer={setContainer}
            />

            <div className='add-option'>

                {errors != undefined && <h3>{errors}</h3>}

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