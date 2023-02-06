import { useContext, useState } from 'react'
import { convertBase64, imageTypes } from '../../utils/AddRemoveImages'
import * as userService from '../../services/authService'
import './register.css'
import { useNavigate } from 'react-router-dom'
import { GlobalInfo } from '../../context/awesomeSnackbar/AwesomeSnackbar'

export const RegisterComponent = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        rePassword: '',
        location: '',
        image: ''
    })

    const { errors, setErrors } = useContext(GlobalInfo)

    const navigate = useNavigate()

    const changeHandler = (e) => {
        setValues(oldState => ({
            ...oldState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        userService.register(values)
            .then(result => {
                if (result.message != 'yes') {
                    if (errors.message == '') {
                        setErrors({ message: result.message, type: '' })

                        setTimeout(() => {
                            setErrors({ message: '', type: '' })
                        }, 2000);
                    }
                } else {
                    setErrors({ message: 'Loading... please wait', type: 'loading' })

                    navigate('/login')
                }
            })
    }


    const addImage = async (e) => {
        let file = e.target.files[0]

        if (file && imageTypes.includes(file.type)) {
            let base64 = await convertBase64(file)

            if (values.image === base64) {
                if (errors?.message !== 'This image already exist!') {
                    setErrors({ message: 'This image already exist!', type: '' })

                    setTimeout(() => {
                        setErrors({ message: '', type: '' })
                    }, 2000);
                }
            } else {
                if (values.image !== '') {
                    if (errors?.message !== 'You cannot upload more than 1 image!') {
                        setErrors({ message: 'You cannot upload more than 1 image!', type: '' })

                        setTimeout(() => {
                            setErrors({ message: '', type: '' })
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
            if (errors?.message !== 'File must be a image!') {
                setErrors({ message: 'File must be a image!', type: '' })

                setTimeout(() => {
                    setErrors({ message: '', type: '' })
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
        <section className='container'>
            <div className="box register">
                <form className="form" onSubmit={onSubmitHandler}>

                    <h2>Sign up</h2>

                    <div className="inputBox">
                        <input type="text" name='username' required='required' value={values.username} onChange={changeHandler} />
                        <span>Username</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" name='password' required='required' value={values.password} onChange={changeHandler} />
                        <span>Password</span>
                        <i></i>
                    </div>

                    <div className="inputBox">
                        <input type="password" name='rePassword' required='required' value={values.rePassword} onChange={changeHandler} />
                        <span>Repeat password</span>
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

                    <a onClick={() => navigate('/login')}>Sign in</a>

                    <input type="submit" value="Register" />

                </form>
            </div>
        </section>
    )
}