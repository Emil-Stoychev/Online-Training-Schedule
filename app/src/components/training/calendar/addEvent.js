import { useState } from "react"
import useGlobalErrorsHook from "../../../hooks/useGlobalErrors.js"
import * as calendarService from '../../../services/calendarService.js'

export const AddEventComponent = ({ token, toggleActive, setToggleActive, year, month, day, setEvents }) => {
    const [container, setContainer] = useState({
        name: '',
        timeFrom: '',
        timeTo: ''
    })

    let [errors, setErrors] = useGlobalErrorsHook()

    const changeValueHandler = (e, name) => {
        setContainer(state => ({
            ...state,
            [name]: e.target.value
        }))
    }

    const onSubmitHandler = () => {
        if (errors.type == 'loading') return
        if (container.name.trim() != '' && container.timeFrom.trim() != '' && container.timeTo.trim() != '') {
            if (container.name.length > 2 && container.timeFrom.length > 1 && container.timeTo.length > 1) {
                setErrors({ message: 'Creating event...', type: 'loading' })

                let data = {
                    token,
                    container,
                    year,
                    month,
                    day
                }

                calendarService.createEvent(data)
                    .then(res => {
                        if (!res.message) {
                            setEvents(state => [...state, res])

                            setErrors({ message: 'You successfully created event!', type: '' })

                            setContainer({ name: '', timeFrom: '', timeTo: '' })
                            setToggleActive(false)
                        } else {
                            setErrors({ message: res.message, type: '' })
                        }
                    })
            } else {
                if (container.name.length <= 2) {
                    setErrors({ message: 'Name must be at least 3 characters', type: '' })
                } else if (container.timeFrom.length < 2) {
                    setErrors({ message: 'Time from must be at least 2 characters', type: '' })
                } else if (container.timeTo.length < 2) {
                    setErrors({ message: 'Time to must be at least 2 characters', type: '' })
                }
            }
        } else {
            setErrors({ message: 'All inputs are required!', type: '' })
        }
    }

    return (
        <>
            <div className={"add-event-wrapper " + (toggleActive ? 'active' : '')}>
                <div className='add-event-header'>
                    <div className='title'>Add Event</div>
                    <i className='fas fa-times close' onClick={() => setToggleActive(false)}></i>
                </div>

                <div className='add-event-body'>
                    <div className='add-event-input'>
                        <input minLength={3} maxLength={30} type='text' placeholder='Event Name' value={container.name} onChange={(e) => changeValueHandler(e, 'name')} className='event-name' />
                    </div>
                    <div className='add-event-input'>
                        <input minLength={0} maxLength={5} type='time' placeholder='Event Time From' value={container.timeFrom} onChange={(e) => changeValueHandler(e, 'timeFrom')} className='event-time-from' />
                    </div>
                    <div className='add-event-input'>
                        <input minLength={1} maxLength={5} type='time' placeholder='Event Time To' value={container.timeTo} onChange={(e) => changeValueHandler(e, 'timeTo')} className='event-time-to' />
                    </div>
                </div>

                <div className='add-event-footer'>
                    <button className='add-event-btn' onClick={() => onSubmitHandler()}>Add Event</button>
                </div>
            </div>
        </>
    )
}