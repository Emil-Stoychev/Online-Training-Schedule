import './training.css'

export const TrainingComponent = () => {


    let today = new Date()
    let activeDay;
    let month = today.getFullMonth()
    let year = today.getFullYear()

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
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const prevLastDay = new Date(year, month, 0)
        const prevDays = prevLastDay.getDate()
        const lastDate = lastDay.getDate()
        const day = firstDay.getDay()
        const nextDays = 7 - lastDate.getDate() - 1

        let days = ''

        for (let x = day; x > 0; x++) {
            days += `<div className='day prev-date'>${prevDays - x + 1}</div>`
        }


        for (let i = 1; i <= lastDate; i++) {
            if (
                i == new Date().getDate() &&
                year == new Date().getFullYear() &&
                month == new Date().getMonth()
            ) {
                days += `<div className='day today'>${i}</div>`
            } else {
                days += `<div className='day'>${i}</div>`
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div className='day next-date'>${j}</div>`
        }
    }

    return (
        <div className="container">
            <div className="left">
                <div className="calendar">
                    <div className="month">
                        <i className='fa fa-angle-left prev'>Prev</i>
                        <div className="date">{{month}}</div>
                        <i className='fa fa-angle-right next'>Next</i>
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

                    </div>

                    <div className="goto-today">
                        <div className="goto">
                            <input type="text" placeholder='mm/yyyy' className='date-input' />
                            <button className='goto-btn'>Go</button>
                        </div>
                        <button className='today-btn'>Today</button>
                    </div>
                </div>
            </div>
        </div>
    )
}