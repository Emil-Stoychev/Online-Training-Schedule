import { useState } from "react"
import useGlobalErrorsHook from "../../../hooks/useGlobalErrors.js"
import * as calendarService from '../../../services/calendarService.js'

export const EventComp = ({ x, token, setEvents }) => {
    const [deleteToggle, setDeleteToggle] = useState(false)
    const [loadingCompleteEvent, setLoadingCompleteEvent] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    let [errors, setErrors] = useGlobalErrorsHook()

    const toggleFinishEvent = (eventId, finish) => {
        if (loadingCompleteEvent) return
        if (eventId && token && !deleteToggle) {
            setLoadingCompleteEvent(true)

            calendarService.toggleFinishEvent(eventId, finish, token)
                .then(res => {
                    setLoadingCompleteEvent(false)
                    if (!res.message) {
                        setEvents(state => state.map(x => {
                            if (x._id == eventId) {
                                x.finish = !finish
                            }

                            return x
                        }))
                    }
                })
        }
    }

    const deleteEventHandler = (eventId) => {

        if (loadingDelete) return
        setLoadingDelete(true)
        calendarService.deleteEvent(eventId, token)
            .then(res => {
                setLoadingDelete(false)

                if (!res.message) {
                    setErrors({ message: 'You successfully deleted this event!', type: '' })
                    setTimeout(() => {
                        setEvents(state => state.filter(x => x._id != eventId))
                    }, 0);
                } else {
                    setErrors({ message: res.message, type: '' })
                }
            })
    }

    return (
        <div className={`event ${x.finish && 'event-finished'}`} key={x._id} >
            <div className='title' >
                <i className='fas fa-circle'></i>
                <h3 className='event-title'>{x.name}</h3>
            </div>

            {x.finish
                ? <i onClick={() => toggleFinishEvent(x._id, x.finish)} className='fa-regular fa-bell toggleFinishBtn' />
                : <i onClick={() => toggleFinishEvent(x._id, x.finish)} className='fa-regular fa-circle-check toggleFinishBtn' />
            }

            <div className='event-time'>{x.timeFrom}{Number(x.timeFrom.slice(0, 2)) < 12 ? 'AM' : 'PM'} - {x.timeTo}{Number(x.timeTo.slice(0, 2)) < 12 ? 'AM' : 'PM'}</div>
            <i className='event-finish-i'>
                {loadingCompleteEvent && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
            </i>


            {!deleteToggle
                ? <i onClick={() => setDeleteToggle(true)} className="fa-solid fa-trash trashBtnForEvent"></i>
                :
                <div className='deleteEventIbtns'>
                    {loadingDelete
                        ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        :
                        <>
                            <i onClick={() => setDeleteToggle(false)}>X</i>
                            <i onClick={() => deleteEventHandler(x?._id)}>✓</i>
                        </>
                    }
                </div>
            }
        </div>
    )
}