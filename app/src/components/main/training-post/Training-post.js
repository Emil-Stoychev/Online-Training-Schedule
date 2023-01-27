import { useEffect, useState } from 'react';
import './training-post.css'

import * as trainingService from '../../../services/trainingService'

export const TrainingPostComponent = ({ token, userId }) => {
    const [training, setTraining] = useState(undefined)
    const [fullImage, setFullImage] = useState(undefined)

    useEffect(() => {
        trainingService.getById(window.location.pathname.split('/training-post/')[1])
            .then(res => {
                if (!res.message) {
                    console.log(res);
                    setTraining(res)
                }
            })
    }, [])

    const openFullImage = (imageId) => {
        trainingService.getFullImage(imageId)
            .then(res => {
                if (!res.message) {
                    setFullImage(res)
                }
            })
    }

    return (
        <div className='training-post'>

            {fullImage != undefined &&
                <div className="training-post-full-image">
                    <span className="btn-to-close-full-image" onClick={() => setFullImage(undefined)} >X</span>
                    <img src={fullImage?.image} alt="" />
                </div>
            }

            <h1>{training?.mainTitle}</h1>

            <hr />

            <div className='training-post-btns'>
                <i className="fa-solid fa-heart">{training?.likes?.length}</i>
                <i className="fa-solid fa-pen-to-square"></i>
                <i className="fa-solid fa-trash"></i>
            </div>

            <div className='training-post-main'>

                {training?.container?.length > 0 &&
                    training?.container.map(x =>
                        x?.option == 'title'
                            ?
                            <h2 key={x?._id}>{x?.value}</h2>
                            :
                            x?.option == 'description'
                                ?
                                <p key={x?._id}>{x?.value}</p>
                                :
                                x?.option == 'restTime'
                                    ?
                                    <p key={x?._id}>
                                        Rest time: <span>{x?.value}</span>
                                    </p>
                                    :
                                    x?.option == 'exerciseTime'
                                        ?
                                        <p key={x?._id}>
                                            Exercise time: <span>{x?.value}</span>
                                        </p>
                                        :
                                        x?.option == 'image' &&
                                        <div className='training-post-main-images' key={x?._id}>
                                            {x?.image.map(x =>
                                                <img onClick={() => openFullImage(x._id)} key={x._id} src={x?.thumbnail} alt="" />
                                            )}
                                            <h2 className='add-training-image'>+</h2>
                                        </div>
                    )
                }
            </div>

        </div >
    )
}