import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './add-program.css'

import * as trainingService from '../../../services/trainingService.js'

import { InputOptionsComponent } from './InputOptions';
import { ProgramBtnsAdd } from './ProgramBtnsAdd';

export const EditProgramComponent = ({ token, userId, setCategories }) => {
    const [container, setContainer] = useState([])
    const [containerIds, setContainerIds] = useState([])
    const [mainInputValue, setMainInputValue] = useState('')
    const [category, setCategory] = useState({
        option: true,
        value: ''
    })
    const [errors, setErrors] = useState(undefined)
    const navigate = useNavigate()


    useEffect(() => {
        trainingService.getById(window.location.pathname.split('/training-edit-program/')[1])
            .then(res => {
                if (!res.message) {
                    setContainerIds(res.container)
                    setCategory({ option: true, value: res?.category.category })
                    setMainInputValue(res.mainTitle)
                    setContainer(res.container)
                }
            })
    }, [])

    const mainInputTitle = useRef(null)

    const onCreateBtnHandler = () => {
        if (category.value.trim() != '' && container.length > 0 && mainInputTitle?.current?.value.trim() != '') {
            let data = [
                window.location.pathname.split('/training-edit-program/')[1],
                mainInputTitle?.current?.value,
                container,
                category,
                containerIds,
            ]

            trainingService.editProgram(token, userId, data)
                .then(res => {
                    console.log(res);
                    if (!res.message) {
                        navigate(`/training-post/${window.location.pathname.split('/training-edit-program/')[1]}`)
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

                {container.length > 0 && <input minLength='3' maxLength='30' value={mainInputValue} onChange={(e) => setMainInputValue(e.target.value)} ref={mainInputTitle} type='text' placeholder='Main title' />}

                {container.length > 0 &&
                    container.map((x) =>
                        <InputOptionsComponent
                            key={x?._id}
                            current={x}
                            setContainer={setContainer}
                            container={container}
                        />
                    )
                }
            </div>

            <div>
                <button className='last-btn' onClick={() => navigate(`/training-post/${window.location.pathname.split('/training-edit-program/')[1]}`)}>Cancel</button>
                <button className='last-btn' onClick={() => onCreateBtnHandler()}>Edit</button>
            </div>

        </section>
    )
}