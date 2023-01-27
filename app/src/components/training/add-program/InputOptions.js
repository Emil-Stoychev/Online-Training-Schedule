import { convertBase64, imageTypes } from '../../../utils/AddRemoveImages.js'
import { v4 as uuid } from 'uuid';
import { useRef } from 'react';

export const InputOptionsComponent = ({ current, setContainer, container }) => {
    const uploadRef = useRef(null)

    const cntValueHandler = (e, id, option) => {
        setContainer(state => state.map((x) => {
            if (Object.values(x)[0]?.id == id && option != 'image') {
                x = { [id]: { value: e.target.value, id, option } }
            }

            return x
        })
        )
    }

    const removeFieldFromCnt = (id) => {
        setContainer(state => state.filter(x => Object.values(x)[0]?.id != id))
    }

    const addImage = async (e, id, option) => {
        let file = e.target.files[0]
        let imageID = uuid()

        if (file && imageTypes.includes(file.type)) {
            let base64 = await convertBase64(file)

            setContainer(state => state.map((x) => {
                if (Object.values(x)[0]?.id == id && option == 'image') {
                    if (Object.values(x)[0]?.image?.length < 6) {
                        x = { [id]: { image: [...Object.values(x)[0]?.image, { id: imageID, data: base64 }], id, option } }
                    }
                }

                return x
            }))
        }
    }

    const removeImage = (e, id, option) => {
        let file = e.target.parentElement.childNodes[0].src

        setContainer(state => state.map((x) => {
            if (Object.values(x)[0]?.id == id && option == 'image') {
                x = { [id]: { image: Object.values(x)[0]?.image.filter(y => y.data != file), id, option } }
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
                    <input minLength='3' maxLength='16' value={container[current?.id]?.value} onChange={(e) => cntValueHandler(e, current?.id, current?.option)} type='text' placeholder='Exercise name' />
                    <h2 onClick={() => removeFieldFromCnt(current?.id)}>&#x2715;</h2>
                </div>
                :
                current?.option == 'description'
                    ?
                    <div>
                        <textarea minLength='3' maxLength='350' onChange={(e) => cntValueHandler(e, current?.id, current?.option)} placeholder='More info here'>{container[current?.id]?.value}</textarea>
                        <h2 onClick={() => removeFieldFromCnt(current?.id)}>&#x2715;</h2>
                    </div>
                    :
                    current?.option == 'restTime'
                        ?
                        <div>
                            <input minLength='0' value={container[current?.id]?.value} onChange={(e) => cntValueHandler(e, current?.id, current?.option)} type='number' id='rest-time' placeholder='Rest time (min)' />
                            <h2 onClick={() => removeFieldFromCnt(current?.id)}>&#x2715;</h2>
                        </div>
                        :
                        current?.option == 'image'
                            ?
                            <div className='image-cnt'>
                                <div className='image-input-file'>
                                    <input ref={uploadRef} style={{ display: 'none' }} onChange={(e) => addImage(e, current?.id, current?.option)} type='file' />
                                    <button className='' onClick={() => uploadFile()}>Upload image</button>
                                    <h2 onClick={() => removeFieldFromCnt(current?.id)}>&#x2715;</h2>
                                </div>

                                <div className='image-cnt-uploadImages'>
                                    {current?.image.length > 0 &&
                                        current?.image?.map(y =>
                                            <div key={y.id}>
                                                <img src={y.data} />
                                                <input
                                                    className="inputBox-UploadImage-Btn"
                                                    type="button"
                                                    value="X"
                                                    onClick={(e) => removeImage(e, current?.id, current?.option)}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            :
                            current?.option == 'exerciseTime' &&
                            <div>
                                <input minLength='0' value={container[current?.id]?.value} onChange={(e) => cntValueHandler(e, current?.id, current?.option)} type='number' id='exercise-time' placeholder='Exercise time (min)' />
                                <h2 onClick={() => removeFieldFromCnt(current?.id)}>&#x2715;</h2>
                            </div>
            }</>
    )
}