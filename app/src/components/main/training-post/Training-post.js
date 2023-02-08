import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './training-post.css'

import * as trainingService from '../../../services/trainingService'
import { TitleComponent } from './trainingFieldOptions.js/Title';
import { DescComponent } from './trainingFieldOptions.js/Desc';
import { RestTimeComponent } from './trainingFieldOptions.js/RestTime';
import { ExerciseTimeComponent } from './trainingFieldOptions.js/ExerciseTime';
import { ImagesComponent } from './trainingFieldOptions.js/ImagesComponent';
import useGlobalErrorsHook from '../../../hooks/useGlobalErrors';

const TrainingPostComponent = ({ token, _id }) => {
    const [training, setTraining] = useState(undefined)
    const [fullImage, setFullImage] = useState(undefined)
    const [toggleDelete, setToggleDelete] = useState(false)

    const navigate = useNavigate()

    let [errors, setErrors] = useGlobalErrorsHook()

    useEffect(() => {
        trainingService.getById(window.location.pathname.split('/training-post/')[1])
            .then(res => {
                if (!res.message) {
                    console.log(res);
                    setTraining(res)
                } else {
                    navigate('/errorPage')
                }
            })
    }, [])

    const openFullImage = (imageId) => {
        setErrors({ message: 'Loading...', type: 'loading' })

        trainingService.getFullImage(imageId)
            .then(res => {
                if (!res.message) {
                    setFullImage(res)
                    setErrors({ message: '', type: '' })
                }
            })
    }

    const toggleLikeTrainingProgram = (trainingId) => {
        if (training?.author?._id == _id) setErrors({ message: 'You cannot like this training program!', type: '' })

        if (training?.author?._id != _id) {
            trainingService.toggleLikeTrainingProgram(trainingId, token)
                .then(res => {
                    console.log(res);
                    if (!res.message) {
                        if (training?.likes.includes(_id)) {
                            setTraining(state => ({
                                ...state,
                                likes: state.likes.filter(x => x != _id)
                            }))

                            setErrors({ message: 'Unliked', type: '' })
                        } else {
                            setTraining(state => ({
                                ...state,
                                likes: [...state.likes, _id]
                            }))

                            setErrors({ message: 'Liked', type: '' })
                        }
                    } else {
                        setErrors({ message: res.message, type: '' })
                    }
                })
        }
    }

    const deleteTrainingProgram = (trainingId) => {
        if (training?.author?._id == _id) {
            setErrors({ message: 'Deleting training program...', type: 'loading' })

            trainingService.deleteTrainingProgram(trainingId, token)
                .then(res => {
                    if (!res.message) {
                        setErrors({ message: 'You successfully deleted this training program!', type: '' })

                        setTimeout(() => {
                            navigate('/profile')
                        }, 0);
                    }
                })
        }
    }

    return (
        <div className='training-post'>

            <div className='training-post-profile' onClick={() => navigate(`/profile/${training?.author?._id}`)}>
                <img src={training?.author?.image != ''
                    ? training?.author?.image
                    : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />
                <div>
                    <h3>{training?.author?.username || ''}</h3>
                    <p>{training?.author?.location || ''}</p>
                </div>
            </div>

            <h3 className='training-post-category'>Category: {training?.category?.category}</h3>

            {fullImage != undefined &&
                <div className="training-post-full-image">
                    <span className="btn-to-close-full-image" onClick={() => setFullImage(undefined)} >X</span>
                    <img src={fullImage?.image} alt="" />
                </div>
            }

            <h1>{training?.mainTitle}</h1>

            <hr />

            <div className='training-post-btns'>
                <i onClick={() => toggleLikeTrainingProgram(training?._id)} className={`fa-solid fa-heart ${training?.likes?.includes(_id) && 'liked'}`}>{training?.likes?.length}</i>
                {training?.author?._id == _id && <i onClick={() => navigate(`/training-edit-program/${training?._id}`)} className="fa-solid fa-pen-to-square"></i>}
                {training?.author?._id == _id ?
                    !toggleDelete
                        ? <i onClick={() => setToggleDelete(true)} className="fa-solid fa-trash trashBtn"></i>
                        :
                        <>
                            <button onClick={() => deleteTrainingProgram(training?._id)}>✓</button>
                            <button onClick={() => setToggleDelete(false)}>X</button>
                        </>
                    : ''}
            </div>

            <div className='training-post-main'>

                {training?.container?.length > 0 &&
                    training?.container.map(x =>
                        x?.option == 'title'
                            ? <TitleComponent key={x._id} x={x} _id={_id} token={token} setTraining={setTraining} />
                            : x?.option == 'description'
                                ? <DescComponent key={x._id} x={x} _id={_id} token={token} setTraining={setTraining} />
                                : x?.option == 'restTime'
                                    ? <RestTimeComponent key={x._id} x={x} _id={_id} token={token} setTraining={setTraining} />
                                    : x?.option == 'exerciseTime'
                                        ? <ExerciseTimeComponent key={x._id} x={x} _id={_id} token={token} setTraining={setTraining} />
                                        : x?.option == 'image' &&
                                        <ImagesComponent key={x._id} x={x} openFullImage={openFullImage} />
                    )
                }
            </div>

        </div >
    )
}

export default TrainingPostComponent