import { useState } from "react"
import * as trainingService from '../../../services/trainingService.js'
import { format } from "timeago.js";
import { ShowFastInfoAboutProgram } from "./ShowFastProgramInfo.js";
import useGlobalErrorsHook from "../../../hooks/useGlobalErrors.js";


export const ShowPrograms = ({ token, x, userId, setCategories }) => {
    const [trainings, setTrainings] = useState([])
    const [toggleDelCat, setToggleDelCat] = useState(false)
    const [toggleEditCat, setToggleEditCat] = useState({
        option: false,
        value: ''
    })

    let [errors, setErrors] = useGlobalErrorsHook()

    const deleteCategory = (categoryId) => {
        setErrors({ message: 'Deleting...', type: 'loading' })

        trainingService.deleteCategory(categoryId, token)
            .then(res => {
                if (!res.message) {
                    setErrors({ message: 'You successfully deleted this category!', type: '' })

                    setTimeout(() => {
                        setCategories(state => state.filter(x => x._id != categoryId))
                    }, 0);
                } else {
                    setErrors({ message: res.message, type: '' })
                }
            })
    }

    const getTrainingsByCategory = (categoryId) => {
        if (trainings.length == 0 && errors.type != 'loading') {
            setErrors({ message: 'Loading...', type: 'loading' })

            trainingService.getTrainingsByCategory(categoryId)
                .then(res => {

                    if (!res.message) {
                        setTrainings(res)
                        setErrors({ message: `${res?.length} items found!`, type: '' })
                    } else {
                        setErrors({ message: 'Empty!', type: '' })
                        setTrainings([])
                    }
                })
        } else {
            setTrainings([])
        }
    }

    const onChangeEditCatHandler = (e) => {
        setToggleEditCat(state => ({
            ...state,
            value: e.target.value
        }))
    }

    const editCategoryName = (categoryId) => {
        if (toggleEditCat.value.trim() != '' && toggleEditCat.value.length > 3) {
            setErrors({ message: 'Editing...', type: 'loading' })

            trainingService.editCategoryName(categoryId, toggleEditCat.value, token)
                .then(res => {
                    if (!res.message) {
                        setCategories(state => state.map(x => {
                            if (x._id == categoryId) {
                                x.category = toggleEditCat.value
                            }

                            return x
                        }))

                        setErrors({ message: 'You successfully edited this category!', type: '' })

                        setToggleEditCat({ option: false, value: '' })
                    } else {
                        setErrors({ message: res.message, type: '' })
                    }
                })
        } else {
            setErrors({ message: 'Category must be at least 3 characters!', type: '' })
        }

    }

    return (
        <>
            <h2>
                {!toggleDelCat &&
                    <>
                        <p className="fa-solid fa-pen-to-square" onClick={() => setToggleEditCat({ option: true, value: x.category })} />
                        {toggleEditCat.option
                            ?
                            <>
                                <input value={toggleEditCat.value} onChange={(e) => onChangeEditCatHandler(e)} />
                                <button onClick={() => setToggleEditCat({ option: false, value: '' })}>X</button>
                                <button onClick={() => editCategoryName(x._id)}>✓</button>
                            </>
                            :
                            <>
                                {x?.category}
                                <i onClick={() => getTrainingsByCategory(x?._id)} className="fa-solid fa-eye"></i>
                            </>
                        }
                    </>
                }
                {toggleDelCat
                    ?
                    <>
                        Are you sure, this will delete all items inside!
                        <i onClick={() => setToggleDelCat(false)}>X</i>
                        <i onClick={() => deleteCategory(x?._id)}>✓</i>
                    </>
                    :
                    !toggleEditCat.option && <i onClick={() => setToggleDelCat(true)} className="fa-solid fa-trash trashBtn"></i>
                }
            </h2>
            <hr className='notes-category-header-hr' />

            {trainings.length > 0 &&
                trainings.map(y =>
                    <ShowFastInfoAboutProgram key={y?._id} y={y} />
                )
            }
        </>
    )
}