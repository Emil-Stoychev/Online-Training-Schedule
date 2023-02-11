import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './add-program.css'

import * as trainingService from '../../../services/trainingService.js'

import { InputOptionsComponent } from './InputOptions';
import { ProgramBtnsAdd } from './ProgramBtnsAdd';
import useGlobalErrorsHook from '../../../hooks/useGlobalErrors';

const EditProgramComponent = ({ token, userId, setCategories }) => {
    const [container, setContainer] = useState([])
    const [containerIds, setContainerIds] = useState([])
    const [deleteImagesIds, setDeleteImagesIds] = useState([])
    const [mainInputValue, setMainInputValue] = useState('')
    const [category, setCategory] = useState({
        option: true,
        value: ''
    })
    const [visible, setVisible] = useState({
        value: 'Loading...'
    })
    let [errors, setErrors] = useGlobalErrorsHook()
    const navigate = useNavigate()


    useEffect(() => {
        window.onload = window.scrollTo(0, 0)
        setErrors({ message: 'Loading...', type: 'loading' })

        trainingService.getById(window.location.pathname.split('/training-edit-program/')[1])
            .then(res => {
                if (!res.message) {
                    setErrors({ message: '', type: '' })
                    setCategory({ option: true, value: res?.category.category })
                    setMainInputValue(res.mainTitle)
                    setContainer(res.container)
                    setVisible({ value: res.visible })
                } else {
                    setErrors({ message: res.message, type: '' })
                }
            })
    }, [])

    const mainInputTitle = useRef(null)

    const onCreateBtnHandler = () => {
        if (errors.type == 'loading') return
        if (category.value.trim() != '' && container.length > 0 && mainInputTitle?.current?.value.trim() != '') {
            let testInputs = false

            if (container.length > 0) {
                container.forEach(x => {

                    if (x.option == 'image') {
                        if (x.image.length == 0) {
                            setErrors({ message: `You must upload at least 1 image or remove field!` })
                            testInputs = true
                            return
                        } else {
                            return
                        }
                    }

                    let currInputValue = x?.[x.option] == undefined ? x?.value : x?.[x.option]

                    if (currInputValue.trim() == '') {
                        testInputs = true
                        setErrors({ message: `${x.option} is required!` })
                        return
                    }
                })
            }

            if (testInputs) {
                return
            }

            setErrors({ message: 'Editing...', type: 'loading' })

            let data = [
                window.location.pathname.split('/training-edit-program/')[1],
                mainInputTitle?.current?.value,
                container,
                category,
                containerIds,
                deleteImagesIds,
                visible.value
            ]

            trainingService.editProgram(token, userId, data)
                .then(res => {
                    if (!res.message) {
                        setErrors({ message: 'You successfully edited this training program!', type: '' })

                        setTimeout(() => {
                            navigate(`/training-post/${window.location.pathname.split('/training-edit-program/')[1]}`)
                        }, 0);
                    } else {
                        setErrors({ message: res.message, type: '' })
                    }
                })
        } else {
            setErrors({ message: 'All inputs must be filled!', type: '' })
        }
    }

    return (
        <section className='add-program'>
            <h1>Add program</h1>

            <ProgramBtnsAdd
                userId={userId}
                setCategory={setCategory}
                category={category}
                setContainer={setContainer}
                setVisible={setVisible}
                visible={visible}
            />

            <div className='add-option'>

                {container.length > 0 && <input minLength='3' maxLength='30' value={mainInputValue} onChange={(e) => setMainInputValue(e.target.value)} ref={mainInputTitle} type='text' placeholder='Main title' />}

                {container.length > 0 &&
                    container.map((x) =>
                        <InputOptionsComponent
                            key={x?._id || x.id}
                            current={x}
                            setContainer={setContainer}
                            container={container}
                            setContainerIds={setContainerIds}
                            setDeleteImagesIds={setDeleteImagesIds}
                        />
                    )
                }
            </div>

            <div>
                <button className='last-btn' onClick={() => navigate(`/training-post/${window.location.pathname.split('/training-edit-program/')[1]}`)}>Cancel</button>
                {errors.type != 'loading' && <button className='last-btn' onClick={() => onCreateBtnHandler()}>Edit</button>}
            </div>

        </section>
    )
}

export default EditProgramComponent