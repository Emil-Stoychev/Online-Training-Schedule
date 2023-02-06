import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalInfo } from '../../context/awesomeSnackbar/AwesomeSnackbar'
import * as userService from '../../services/authService'
import './login.css'

export const LoginComponent = ({ setToken }) => {
    const [values, setValues] = useState({
        username: '',
        password: '',
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

        userService.login(values)
            .then(result => {
                if (result.message != 'yes') {
                    if (errors.message == '') {
                        setErrors({ message: result.message, type: '' })

                        setTimeout(() => {
                            setErrors({ message: '', type: '' })
                        }, 2000);
                    }
                } else {
                    if (errors.message == '') {
                        setErrors({ message: 'Loading... please wait', type: 'loading' })

                        setTimeout(() => {
                            setErrors({ message: '', type: '' })
                        }, 2000);
                    }
                    localStorage.setItem('sessionStorage', result.token)

                    setToken({
                        token: result.token,
                        _id: result._id
                    })

                    navigate('/')
                }
            })
    }

    return (
        <section className='container'>
            <div className="box">
                <form className="form" onSubmit={onSubmitHandler}>

                    <h2>Sign in</h2>

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

                    <a onClick={() => navigate('/register')}>Sign up</a>

                    <input type="submit" value="Login" />

                </form>
            </div>
        </section>
    )
}