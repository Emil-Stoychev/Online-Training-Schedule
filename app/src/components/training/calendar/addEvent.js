import { useState } from "react"
import * as calendarService from '../../../services/calendarService.js'

export const AddEventComponent = ({ token, toggleActive, setToggleActive, year, month, day, setEvents }) => {
    const [container, setContainer] = useState({
        name: '',
        timeFrom: '',
        timeTo: ''
    })

    const changeValueHandler = (e, name) => {
        setContainer(state => ({
            ...state,
            [name]: e.target.value
        }))
    }

    const onSubmitHandler = () => {
        if (container.name.trim() != '' && container.timeFrom.trim() != '' && container.timeTo.trim() != '') {
            if (container.name.length > 2 && container.timeFrom.length > 2 && container.timeTo.length > 2) {
                let data = {
                    token,
                    container,
                    year,
                    month,
                    day
                }

                calendarService.createEvent(data)
                    .then(res => {
                        console.log(res);
                        if (!res.message) {
                            setEvents(state => [...state, res])

                            setContainer({ name: '', timeFrom: '', timeTo: '' })
                            setToggleActive(false)
                        }
                    })
            }
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
                        <input minLength={1} maxLength={5} type='text' placeholder='Event Time From' value={container.timeFrom} onChange={(e) => changeValueHandler(e, 'timeFrom')} className='event-time-from' />
                    </div>
                    <div className='add-event-input'>
                        <input minLength={1} maxLength={5} type='text' placeholder='Event Time To' value={container.timeTo} onChange={(e) => changeValueHandler(e, 'timeTo')} className='event-time-to' />
                    </div>
                </div>

                <div className='add-event-footer'>
                    <button className='add-event-btn' onClick={() => onSubmitHandler()}>Add Event</button>
                </div>
            </div>
        </>
    )
}