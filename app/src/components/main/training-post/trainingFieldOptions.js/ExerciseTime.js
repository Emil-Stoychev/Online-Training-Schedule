import { useState } from "react"
import useGlobalErrorsHook from "../../../../hooks/useGlobalErrors"
import * as trainingService from '../../../../services/trainingService'

export const ExerciseTimeComponent = ({ x, _id, token, setTraining }) => {
    const [toggleEdit, setToggleEdit] = useState({
        option: false,
        value: ''
    })

    let [errors, setErrors] = useGlobalErrorsHook()

    const editValueHandler = (e) => {
        setToggleEdit(state => ({
            ...state,
            value: e.target.value
        }))
    }

    const submitEditHandler = () => {
        if (toggleEdit.value.trim() != '' && toggleEdit.value.length > 3) {
            setErrors({ message: 'Editing...', type: 'loading' })

            trainingService.editCntValue(toggleEdit.value, x._id, token)
                .then(res => {
                    if (!res.message) {
                        setTraining(state => ({
                            ...state,
                            container: state.container.map(y => {
                                if (y._id == x._id) {
                                    y.value = res
                                }

                                return y
                            })
                        }))

                        setErrors({ message: 'You successfully edited exercise time!', type: '' })

                        setToggleEdit({
                            value: '',
                            option: false
                        })
                    } else {
                        setErrors({ message: res.message, type: '' })
                    }
                })
        } else {
            setErrors({ message: 'Exercise time must be at least 3 charaters!', type: '' })
        }
    }


    return (
        <>
            {
                toggleEdit.option
                    ?
                    <>
                        <input className="trainingProgramEditInput" minLength='3' maxLength='16' value={toggleEdit.value} onChange={(e) => editValueHandler(e)} />
                        <div className="trainingProgramEditBtns">
                            <button onClick={() => submitEditHandler()}>✓</button>
                            <button onClick={() => setToggleEdit({ value: '', option: false })}>X</button>
                        </div>
                    </>
                    :
                    <p>{x.author == _id && <i onClick={() => setToggleEdit({ value: x.value, option: true })} className="fa-solid fa-pen-to-square"></i>} Exercise time: <span>{x?.value}</span></p>
            }
        </>
    )
}