import { useEffect, useState } from 'react'
import './calendar.css'
import * as calendarService from '../../../services/calendarService.js'

import { initialCalendar } from './initCalendar'
import { AddEventComponent } from './addEvent'
import { EventComp } from './EventComp'
import { CalendarTable } from './CalendarTable'
import useGlobalErrorsHook from '../../../hooks/useGlobalErrors'

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const CalendarComponent = ({ token, userId }) => {
    const [days, setDays] = useState([])
    const [cont, setCont] = useState({
        today: new Date(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [events, setEvents] = useState([])
    const [toggleActive, setToggleActive] = useState(false)
    const [currDayNumber, setCurrDayNumber] = useState(new Date().getDate())
    const [loadingEvents, setLoadingEvents] = useState(false)
    let currDayValue = undefined

    let [errors, setErrors] = useGlobalErrorsHook()

    useEffect(() => {
        initialCalendar(setDays, cont, addActiveCurrDay, currDayValue)
    }, [cont])

    useEffect(() => {
        calendarService.initCalendar(token, cont.year, months[cont.month])
            .then(res => {
                if (!res.message) {

                }
            })
    }, [])

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
        setEvents([])
        setLoadingEvents(true)

        calendarService.getCurrDay(token, cont.year, months[cont.month], currDayNumber)
            .then(res => {
                setLoadingEvents(false)

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

    return (
        <div className="container">
            <div className="left">
                <CalendarTable
                    prevMonth={prevMonth}
                    months={months}
                    nextMonth={nextMonth}
                    cont={cont}
                    days={days}
                    todayBtn={todayBtn}
                />
            </div>

            <div className='right'>
                <div className='today-date'>
                    <div className='event-day'>{weekDays[new Date(`${cont.year}-${cont.month + 1}-${currDayNumber}`).getDay()]}</div>
                    <div className='event-date'>{currDayNumber} {months[cont.month]} {cont.year}</div>
                </div>

                <div className='events'>
                    {events.length > 0
                        ? events.map(x => <EventComp key={x._id} x={x} token={token} setEvents={setEvents} />)
                        : loadingEvents
                            ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            : <h3 className='no-events-h3'>No events!</h3>
                    }
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