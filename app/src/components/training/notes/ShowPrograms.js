import { useState } from "react"
import * as trainingService from '../../../services/trainingService.js'
import { format } from "timeago.js";
import { ShowFastInfoAboutProgram } from "./ShowFastProgramInfo.js";


export const ShowPrograms = ({ token, x, userId, setCategories }) => {
    const [trainings, setTrainings] = useState([])
    const [toggleDelCat, setToggleDelCat] = useState(false)

    const deleteCategory = (categoryId) => {
        trainingService.deleteCategory(categoryId, token)
            .then(res => {
                if (!res.message) {
                    setCategories(state => state.filter(x => x._id != categoryId))
                }
            })
    }

    const getTrainingsByCategory = (categoryId) => {
        if (trainings.length == 0) {
            trainingService.getTrainingsByCategory(categoryId)
                .then(res => {
                    if (!res.message) {
                        setTrainings(res)
                    } else {
                        setTrainings([])
                    }
                })
        } else {
            setTrainings([])
        }
    }

    return (
        <>
            <h2>
                {!toggleDelCat &&
                    <>
                        {x?.category}
                        <i onClick={() => getTrainingsByCategory(x?._id)} className="fa-solid fa-eye"></i>
                    </>
                }
                {toggleDelCat
                    ?
                    <>
                        <p>Are you sure, this will delete all items inside!</p>
                        <i onClick={() => setToggleDelCat(false)}>X</i>
                        <i onClick={() => deleteCategory(x?._id)}>✓</i>
                    </>
                    :
                    <i onClick={() => setToggleDelCat(true)} className="fa-solid fa-trash trashBtn"></i>}
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