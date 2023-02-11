export const CalendarTable = ({
    prevMonth,
    months,
    nextMonth,
    cont,
    days,
    todayBtn,
}) => {

    return (
        <>
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
        </>
    )
}