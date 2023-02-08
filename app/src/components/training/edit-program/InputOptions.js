import { convertBase64, imageTypes } from '../../../utils/AddRemoveImages.js'
import { v4 as uuid } from 'uuid';
import { useRef } from 'react';
import useGlobalErrorsHook from '../../../hooks/useGlobalErrors.js';

export const InputOptionsComponent = ({ current, setContainer, container, setContainerIds, setDeleteImagesIds }) => {
    const uploadRef = useRef(null)

    let [errors, setErrors] = useGlobalErrorsHook()

    const cntValueHandler = (e, id, option) => {
        setContainer(state => state.map((x) => {
            if (x?._id == id && option != 'image') {
                x = { value: e.target.value, _id: id, option, new: true }
            }

            return x
        })
        )
    }

    const removeFieldFromCnt = (id) => {
        setTimeout(() => {
            setContainer(state => state.filter(x => x?._id != id))
            setContainerIds(x => [...x, id])
        }, 0);
        setErrors({ message: 'Removed!', type: '' })
    }

    const addImage = async (e, id, option) => {
        let file = e.target.files[0]
        let imageID = uuid()

        if (file && imageTypes.includes(file.type)) {
            setErrors({ message: 'Uploading...', type: 'loading' })

            let base64 = await convertBase64(file)

            setContainer(state => state.map((x) => {
                if (x?._id == id && option == 'image') {
                    if (x?.image?.length < 6) {
                        x = { image: [...x?.image, { _id: imageID, thumbnail: base64, new: true }], _id: id, option, new: x.new }
                    }
                }

                return x
            }))
        } else {
            setErrors({ message: 'File must be a image! (png, jpeg, jpg, raw)', type: '' })
        }

        e.target.value = null
    }

    const removeImage = (imageId, id, option) => {
        setDeleteImagesIds(state => [...state, imageId])
        setErrors({ message: imageId, type: 'remove image' })

        setContainer(state => state.map((x) => {
            if (x?._id == id && option == 'image') {
                x = { image: x?.image.filter(y => y._id != imageId), _id: id, option, new: x?.new }
            }

            return x
        }))
    }

    const uploadFile = () => {
        uploadRef.current.click()
    }

    return (
        <>
            {current?.option == 'title'
                ?
                <div>
                    <input minLength='3' maxLength='16' value={container.find(x => x._id == current._id).value || ''} onChange={(e) => cntValueHandler(e, current?._id, current?.option)} type='text' placeholder='Exercise name' />
                    <h2 onClick={() => removeFieldFromCnt(current?._id)}>&#x2715;</h2>
                </div>
                :
                current?.option == 'description'
                    ?
                    <div>
                        <textarea minLength='3' maxLength='550' onChange={(e) => cntValueHandler(e, current?._id, current?.option)} placeholder='More info here' value={container.find(x => x._id == current._id).value || ''} ></textarea>
                        <h2 onClick={() => removeFieldFromCnt(current?._id)}>&#x2715;</h2>
                    </div>
                    :
                    current?.option == 'restTime'
                        ?
                        <div>
                            <input minLength='0' value={container.find(x => x._id == current._id).value || ''} onChange={(e) => cntValueHandler(e, current?._id, current?.option)} type='number' id='rest-time' placeholder='Rest time (min)' />
                            <h2 onClick={() => removeFieldFromCnt(current?._id)}>&#x2715;</h2>
                        </div>
                        :
                        current?.option == 'image'
                            ?
                            <div className='image-cnt'>
                                <div className='image-input-file'>
                                    <input ref={uploadRef} style={{ display: 'none' }} onChange={(e) => addImage(e, current?._id, current?.option)} type='file' />
                                    <button className='' onClick={() => uploadFile()}>Upload image</button>
                                    <h2 onClick={() => removeFieldFromCnt(current?._id)}>&#x2715;</h2>
                                </div>

                                <div className='image-cnt-uploadImages'>
                                    {current?.image.length > 0 &&
                                        current?.image?.map(y =>
                                            <div key={y._id}>
                                                <img src={y.thumbnail} />
                                                <input
                                                    className="inputBox-UploadImage-Btn"
                                                    type="button"
                                                    value="X"
                                                    onClick={() => removeImage(y._id, current?._id, current?.option)}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            :
                            current?.option == 'exerciseTime' &&
                            <div>
                                <input minLength='0' value={container.find(x => x._id == current._id).value || ''} onChange={(e) => cntValueHandler(e, current?._id, current?.option)} type='number' id='exercise-time' placeholder='Exercise time (min)' />
                                <h2 onClick={() => removeFieldFromCnt(current?._id)}>&#x2715;</h2>
                            </div>
            }</>
    )
}