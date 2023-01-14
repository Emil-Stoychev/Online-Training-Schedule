import { useState } from 'react'
import { convertBase64, imageTypes } from '../../utils/AddRemoveImages'
import * as userService from '../../services/authService'
import { useNavigate } from 'react-router-dom'

export const EditProfileComponent = ({ setToken, user, userId, token, setUser, setViewOptions, changeView }) => {
    const [errors, setErrors] = useState('')
    const [values, setValues] = useState({
        username: user?.username || '',
        password: '',
        newPassword: '',
        location: user?.location || '',
        image: user?.image || ''
    })
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setValues(oldState => ({
            ...oldState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        userService.editProfile(values, userId, token)
            .then(result => {
                if (result.message) {
                    if (errors == '') {
                        setErrors(result.message)

                        setTimeout(() => {
                            setErrors('')
                        }, 2000);
                    }
                } else {
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
            let base64 = await convertBase64(file)

            if (values.image === base64) {
                if (errors !== 'This image already exist!') {
                    setErrors('This image already exist!')

                    setTimeout(() => {
                        setErrors('')
                    }, 2000);
                }
            } else {
                if (values.image !== '') {
                    if (errors !== 'You cannot upload more than 1 image!') {
                        setErrors('You cannot upload more than 1 image!')

                        setTimeout(() => {
                            setErrors('')
                        }, 2000);
                    }
                } else {
                    setValues(state => ({
                        ...state,
                        ['image']: base64
                    }));
                }
            }
        } else {
            if (errors !== 'File must be a image!') {
                setErrors('File must be a image!')

                setTimeout(() => {
                    setErrors('')
                }, 2000);
            }
        }

        e.target.value = null
    }

    const removeImage = (e) => {
        setValues(state => ({
            ...state,
            ['image']: ''
        }));
    }

    return (
        <article className='profile-edit-info'>
            <div className="box-edit">
                <form className="form" onSubmit={onSubmitHandler}>

                    <h2>Edit Profile</h2>

                    {errors != '' ? <h2>{errors}</h2> : ''}

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
                        <input type="file" onChange={(e) => addImage(e)} />
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
                        <input type="button" className='profile-deleteBtn' value="Delete Acc" onClick={() => deleteAcc()} />
                    </div>

                </form>
            </div>
        </article>
    )
}