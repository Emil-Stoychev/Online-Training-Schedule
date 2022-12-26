import { useEffect, useState } from 'react'
import './training.css'

export const TrainingComponent = () => {
    let [days, setDays] = useState([])
    let [cont, setCont] = useState({
        today: new Date(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    useEffect(() => {
        initCalendar()
    }, [cont])

    let activeDay;

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

    const initCalendar = () => {
        setDays([])

        const firstDay = new Date(cont.year, cont.month, 1)
        const lastDay = new Date(cont.year, cont.month + 1, 0)
        const prevLastDay = new Date(cont.year, cont.month, 0)

        const prevDays = prevLastDay?.getDate()
        const lastDate = lastDay?.getDate()
        const day = firstDay?.getDay()
        const nextDays = 7 - lastDay?.getDay() - 1

        for (let x = day; x > 0; x--) {
            setDays(state => [...state, <div className='day prev-date' key={Math.random() * 100}>{prevDays - x + 1}</div>])
        }

        for (let i = 1; i <= lastDate; i++) {
            if (
                i == new Date().getDate() &&
                cont.year == new Date().getFullYear() &&
                cont.month == new Date().getMonth()
            ) {
                setDays(state => [...state, <div className='day today' key={Math.random() * 50}>{i}</div>])
            } else {
                setDays(state => [...state, <div className='day ' key={Math.random() * 30}>{i}</div>])
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            setDays(state => [...state, <div className='day next-date' key={Math.random() * 67}>{j}</div>])
        }
    }

    const prevMonth = () => {
        cont.month--;

        if (cont.month < 0) {
            cont.month = 11;
            cont.year--;
        }
        initCalendar()
    }

    const nextMonth = () => {
        cont.month++;

        if (cont.month > 11) {
            cont.month = 0;
            cont.year++;
        }
        initCalendar()
    }

    const todayBtn = () => {
        setCont({
            today: new Date(),
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        })
        initCalendar()
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
                    <div className='event'>
                        <div className='title'>
                            <i className='fas fa-circle'></i>
                            <h3 className='event-title'>Event 1</h3>
                        </div>
                        <div className='event-time'>10:00 - 12:00PM</div>
                    </div>
                    <div className='event'>
                        <div className='title'>
                            <i className='fas fa-circle'></i>
                            <h3 className='event-title'>Event 2</h3>
                        </div>
                        <div className='event-time'>10:00 - 12:00PM</div>
                    </div>
                    <div className='event'>
                        <div className='title'>
                            <i className='fas fa-circle'></i>
                            <h3 className='event-title'>Event 3</h3>
                        </div>
                        <div className='event-time'>10:00 - 12:00PM</div>
                    </div>
                </div>

                <div className='add-event-wrapper'>
                    <div className='add-event-header'>
                        <div className='title'>Add Event</div>
                        <i className='fas fa-times close'></i>
                    </div>

                    <div className='add-event-body'>
                        <div className='add-event-input'>
                            <input type='text' placeholder='Event Name' className='event-name'></input>
                        </div>
                        <div className='add-event-input'>
                            <input type='text' placeholder='Event Time From' className='event-time-from'></input>
                        </div>
                        <div className='add-event-input'>
                            <input type='text' placeholder='Event Tim To' className='event-time-to'></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}