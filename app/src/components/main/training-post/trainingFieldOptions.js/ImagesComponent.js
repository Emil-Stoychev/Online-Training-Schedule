import { useRef, useState } from "react"
import * as trainingService from '../../../../services/trainingService'
import { v4 as uuid } from 'uuid';

import { convertBase64, imageTypes } from '../../../../utils/AddRemoveImages.js'


export const ImagesComponent = ({ x, _id, openFullImage, token, setTraining, trainingId }) => {
    const [toggleEdit, setToggleEdit] = useState({
        option: false,
        image: []
    })
    const uploadRef = useRef(null)

    const uploadFile = () => {
        uploadRef.current.click()
    }

    const addImage = async (e, id, option) => {
        let file = e.target.files[0]
        let imageID = uuid()

        if (file && imageTypes.includes(file.type)) {
            let base64 = await convertBase64(file)

            setToggleEdit(state => ({
                ...state,
                image: [...state.image, { _id: imageID, thumbnail: base64, new: true }]
            }))
        }
    }

    const removeImage = (e, id) => {
        setToggleEdit(state => ({
            ...state,
            image: state.image.filter(y => y._id != id)
        }))
    }

    const onSubmitHandler = () => {
        let idsForDeleting = x?.image.map((img, i) => {
            if (toggleEdit.image[i]?._id != img._id) {
                return img._id
            }
        })

        trainingService.updateImagesFromTrainingProgram(toggleEdit.image, idsForDeleting, trainingId, token, x._id)
            .then(res => {
                console.log(res);
                if (!res.message) {

                }
            })
    }

    return (
        <div className='training-post-main-images' key={x?._id}>
            {!toggleEdit.option && x?.image.map(x =>
                <img onClick={() => openFullImage(x._id)} key={x._id} src={x?.thumbnail} alt="" />
            )}

            {!toggleEdit.option
                ?
                <h2 className='add-training-image' onClick={() => setToggleEdit({ option: true, image: [...x.image] })}>+</h2>
                :
                <>
                    {toggleEdit?.image.length > 0 &&
                        toggleEdit?.image?.map(y =>
                            <div key={y._id}>
                                <img src={y.thumbnail} />
                                <input
                                    className="inputBox-UploadImage-Btn"
                                    type="button"
                                    value="X"
                                    onClick={(e) => removeImage(e, y?._id)}
                                />
                            </div>
                        )
                    }
                    <input ref={uploadRef} style={{ display: 'none' }} onChange={(e) => addImage(e)} type='file' />
                    <h2 className='add-training-image' onClick={() => uploadFile()}>+</h2>
                    <button onClick={() => onSubmitHandler()}>✓</button>
                    <button onClick={() => setToggleEdit({ option: false, image: [] })}>X</button>
                </>
            }
        </div>
    )
}