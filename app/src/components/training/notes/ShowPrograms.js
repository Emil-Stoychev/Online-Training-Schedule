import { useState } from "react"
import * as trainingService from '../../../services/trainingService.js'
import { format } from "timeago.js";
import { ShowFastInfoAboutProgram } from "./ShowFastProgramInfo.js";


export const ShowPrograms = ({ x, userId }) => {
    const [trainings, setTrainings] = useState([])

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
            <h2 onClick={() => getTrainingsByCategory(x?._id)} >{x?.category} <i className="fa-solid fa-eye"></i></h2>
            <hr className='notes-category-header-hr' />

            {trainings.length > 0 &&
                trainings.map(y =>
                    <ShowFastInfoAboutProgram key={y?._id} y={y} />
                )
            }
        </>
    )
}