import { useRef, useState } from 'react'
import { convertBase64, imageTypes } from '../../utils/AddRemoveImages'
import * as userService from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import useGlobalErrorsHook from '../../hooks/useGlobalErrors'

export const EditProfileComponent = ({ setToken, user, userId, token, setUser, setViewOptions, changeView }) => {
    const [values, setValues] = useState({
        username: user?.username || '',
        password: '',
        newPassword: '',
        location: user?.location || '',
        image: user?.image || ''
    })
    const uploadRef = useRef(null)

    const navigate = useNavigate()

    let [errors, setErrors] = useGlobalErrorsHook()

    const uploadFile = () => {
        uploadRef.current.click()
    }

    const changeHandler = (e) => {
        setValues(oldState => ({
            ...oldState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        setErrors({ message: 'Editing...', type: 'loading' })

        userService.editProfile(values, userId, token)
            .then(result => {
                if (result.message) {
                    setErrors({ message: result.message, type: '' })
                } else {
                    setErrors({ message: 'You successfully edited your profile!', type: '' })

                    setTimeout(() => {
                        setUser(result)
                        setViewOptions({
                            ownPosts: false,
                            trainings: false,
                            savedPosts: false,
                            savedTrainings: false,
                            followers: false,
                            following: false,
                            edit: false
                        })
                        setToken(state => ({
                            ...state,
                            image: values.image
                        }))
                    }, 0);
                }
            })
    }

    const deleteAcc = () => {
        if (values.password && values.password.length >= 3 && values.password.trim() !== '') {
            userService.deleteAccount(values.password, token)
                .then(res => console.log(res))
            console.log('Delete acc!');
        } else {
            if (errors !== 'Password must be at least 3 character!') {
                setErrors('Password must be at least 3 character!')

                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        }
    }

    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
            setErrors({ message: 'Uploading...', type: 'loading' })
            let base64 = await convertBase64(file)

            setValues(state => ({
                ...state,
                ['image']: base64
            }));
        } else {
            setErrors({ message: 'File must be a image! (png, jpeg, jpg, raw)', type: '' })
        }

        e.target.value = null
    }

    const removeImage = (e) => {
        setErrors({ message: e, type: 'remove image' })
        setTimeout(() => {
            setValues(state => ({
                ...state,
                ['image']: ''
            }));
        }, 0);
    }

    return (
        <article className='profile-edit-info'>
            <div className="box-edit">
                <form className="form" onSubmit={onSubmitHandler}>

                    <h2>Edit Profile</h2>

                    <div className="inputBox">
                        <input type="text" name='username' required='required' value={values.username} onChange={changeHandler} />
                        <span>Username</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" name='password' required='required' value={values.password} onChange={changeHandler} />
                        <span>Old Password</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" name='newPassword' value={values.newPassword} onChange={changeHandler} />
                        <span>New Password (optional)</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="text" name='location' required={true} value={values.location} onChange={changeHandler} />
                        <span>Location</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="file" style={{ display: 'none' }} onChange={(e) => addImage(e)} ref={uploadRef} />
                        <input type="button" defaultValue='Upload image' className='' onClick={() => uploadFile()} />
                        <span>Profile image (optional)</span>
                        <i></i>
                    </div>

                    <div className='inputBox-uploadImages'>
                        {values.image !== '' &&
                            <div key={values.image}>
                                <img src={values.image} />
                                <input
                                    className="inputBox-UploadImage-Btn"
                                    type="button"
                                    value="X"
                                    onClick={(e) => removeImage(e)}
                                />
                            </div>
                        }
                    </div>

                    <div className='profile-btnOptions'>
                        <input type="submit" className='profile-saveBtn' value="Save" />
                        <input type="button" className='profile-cancelBtn' value="Cancel" onClick={() => changeView('edit')} />
                        {/* <input type="button" className='profile-deleteBtn' value="Delete Acc" onClick={() => deleteAcc()} /> */}
                    </div>

                </form>
            </div>
        </article>
    )
}