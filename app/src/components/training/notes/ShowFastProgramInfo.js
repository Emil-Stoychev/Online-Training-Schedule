import { Fragment, useState } from "react"
import { useNavigate } from 'react-router-dom'
import * as trainingService from '../../../services/trainingService.js'
import { format } from "timeago.js";


export const ShowFastInfoAboutProgram = ({ y }) => {
    const [trainings, setTrainings] = useState([])
    const [showMore, setShowMore] = useState(false)
    const navigate = useNavigate()

    const showFastInfoForCurrProgram = (trainingProgramId) => {
        setShowMore(true)

        trainingService.getFastInfoAboutProgram(trainingProgramId)
            .then(res => {
                if (!res.message) {
                    setTrainings(res)
                }
            })
    }

    return (
        <>
            {!showMore ?
                <article className='notes' key={y?._id} onClick={() => showFastInfoForCurrProgram(y?._id)}>
                    <div>
                        <h2>{y?.mainTitle}</h2>

                        <h3>+</h3>
                    </div>

                    <time>{format(y?.createdAt) || ''}</time>
                    <p className={`notes-${y?.visible}-p`}>{y?.visible}</p>
                </article>
                :
                <article className='notes' onClick={() => setShowMore(false)}>
                    <div>
                        <h2>{y?.mainTitle}</h2>

                        <h3>-</h3>
                    </div>

                    <time>{format(y?.createdAt) || ''}</time>
                    <p className={`notes-${y?.visible}-p`}>{y?.visible}</p>

                    <div className='notes-more'>

                        <div className='notes-more-buttons'>
                            <i className="fa-solid fa-eye" onClick={() => navigate(`/training-post/${y?._id}`)}></i>
                        </div>

                        {trainings?.container &&
                            trainings?.container.map(x =>
                                x?.option == 'title'
                                    ?
                                    <Fragment key={x?._id}>
                                        <h2 key={x?._id}>{x?.value}</h2>
                                        <hr />
                                    </Fragment>
                                    :
                                    x?.option == 'description'
                                        ?
                                        <p key={x?._id}>Desc: {x?.value}</p>
                                        :
                                        x?.option == 'restTime'
                                            ?
                                            <p key={x?._id}>
                                                Rest time: <span className="timeForExercise">{x?.value}</span>
                                            </p>
                                            :
                                            x?.option == 'exerciseTime' &&
                                            <p key={x?._id}>
                                                Exercise time: <span className="timeForExercise">{x?.value}</span>
                                            </p>
                            )}
                    </div>

                </article>
            }
        </>
    )
}