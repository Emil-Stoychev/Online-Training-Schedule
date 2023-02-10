import { useEffect, useState } from 'react'
import './calendar.css'
import * as calendarService from '../../../services/calendarService.js'

import { initialCalendar } from './initCalendar'
import { AddEventComponent } from './addEvent'

export const CalendarComponent = ({ token, userId }) => {
    const [days, setDays] = useState([])
    const [cont, setCont] = useState({
        today: new Date(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [events, setEvents] = useState([])
    const [toggleActive, setToggleActive] = useState(false)
    const [currDayNumber, setCurrDayNumber] = useState(false)
    let currDayValue = undefined

    useEffect(() => {
        initialCalendar(setDays, cont, addActiveCurrDay, currDayValue)
    }, [cont])

    useEffect(() => {
        setCurrDayNumber(new Date().getDate())

        calendarService.initCalendar(token, cont.year, months[cont.month])
            .then(res => {
                console.log(res);
                if (!res.message) {

                }
            })
    }, [])

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    function prevMonth(currDayValue) {
        if (cont.year == 2022) {
            return
        }
        cont.month--;

        if (cont.month < 0) {
            cont.month = 11;
            cont.year--;
        }
        initialCalendar(setDays, cont, addActiveCurrDay, currDayValue)
    }

    function nextMonth(currDayValue) {
        cont.month++;

        if (cont.month > 11) {
            cont.month = 0;
            cont.year++;
        }
        initialCalendar(setDays, cont, addActiveCurrDay, currDayValue)
    }

    function todayBtn() {
        setCurrDayNumber(new Date().getDate())

        setCont({
            today: new Date(),
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        })
        initialCalendar(setDays, cont, addActiveCurrDay, currDayValue)
    }

    function toggle() {
        setToggleActive(x => !x)
    }

    useEffect(() => {
        calendarService.getCurrDay(token, cont.year, months[cont.month], currDayNumber)
            .then(res => {
                if (!res.message) {
                    setEvents([...res])
                } else {
                    setEvents([])
                }
            })
    }, [currDayNumber])

    function addActiveCurrDay(e) {
        let currDayValue = e.currentTarget
        let allDays = e.currentTarget.parentElement.childNodes

        setCurrDayNumber(Number(currDayValue.innerHTML))

        allDays.forEach(x => {
            x.classList.remove('active')
        })

        if (currDayValue.classList.value.includes('prev-date')) {
            prevMonth(currDayValue.innerHTML)
        } else if (currDayValue.classList.value.includes('next-date')) {
            nextMonth(currDayValue.innerHTML)
        }

        currDayValue.classList.add('active')
    }

    const toggleFinishEvent = (eventId, finish) => {

        if (eventId && token) {
            calendarService.toggleFinishEvent(eventId, finish, token)
                .then(res => {
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

    return (
        <div className="container">
            <div className="left">
                <div className="calendar">
                    <div className="month">
                        <i className='fa fa-angle-left prev' onClick={() => prevMonth()}></i>
                        <div className="date">{months[cont.month]} {cont.year}</div>
                        <i className='fa fa-angle-right next' onClick={() => nextMonth()}></i>
                    </div>

                    <div className="weekdays">
                        <div>sun</div>
                        <div>mon</div>
                        <div>tue</div>
                        <div>wed</div>
                        <div>thu</div>
                        <div>fri</div>
                        <div>sat</div>
                    </div>

                    <div className="days">
                        {days?.length > 0 ? days.map(x => x) : ''}
                    </div>

                    <div className="goto-today">
                        <button className='today-btn' onClick={() => todayBtn()}>Today</button>
                    </div>
                </div>
            </div>

            <div className='right'>
                <div className='today-date'>
                    <div className='event-day'>Wed</div>
                    <div className='event-date'>{new Date().getDate()} {months[cont.month]} {cont.year}</div>
                </div>
                <div className='events'>

                    {events.length > 0
                        ? events.map(x =>
                            <div className={`event ${x.finish && 'event-finished'}`} key={x._id} onClick={() => toggleFinishEvent(x._id, x.finish)}>
                                <div className='title'>
                                    <i className='fas fa-circle'></i>
                                    <h3 className='event-title'>{x.name}</h3>
                                </div>
                                <div className='event-time'>{x.timeFrom} - {x.timeTo}PM</div>
                                <i className='event-finish-i'>{x.finish && 'Finished'}</i>
                            </div>
                        )
                        : <h3>No events!</h3>}

                </div>

                <AddEventComponent
                    token={token}
                    toggleActive={toggleActive}
                    setToggleActive={setToggleActive}
                    year={cont.year}
                    month={months[cont.month]}
                    day={currDayNumber}
                    setEvents={setEvents}
                />
                <button className='add-event' onClick={() => toggle()}>
                    <i className='fas fa-plus'></i>
                </button>
            </div>
        </div>
    )
}