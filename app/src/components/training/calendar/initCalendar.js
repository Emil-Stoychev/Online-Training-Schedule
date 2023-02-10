export const initialCalendar = (setDays, cont, addActiveCurrDay, currDayValue) => {
    setDays([])

    const firstDay = new Date(cont.year, cont.month, 1)
    const lastDay = new Date(cont.year, cont.month + 1, 0)
    const prevLastDay = new Date(cont.year, cont.month, 0)

    const prevDays = prevLastDay?.getDate()
    const lastDate = lastDay?.getDate()
    const day = firstDay?.getDay()
    const nextDays = 7 - lastDay?.getDay() - 1

    for (let x = day; x > 0; x--) {
        setDays(state => [...state, <div className='day prev-date ' onClick={(e) => addActiveCurrDay(e)} key={Math.random() * 100}>{prevDays - x + 1}</div>])
    }

    for (let i = 1; i <= lastDate; i++) {

        if (
            i == new Date().getDate() &&
            cont.year == new Date().getFullYear() &&
            cont.month == new Date().getMonth() &&
            currDayValue == undefined
        ) {
            setDays(state => [...state, <div className={'day today active'} onClick={(e) => addActiveCurrDay(e)} key={Math.random() * 50}>{i}</div>])
        } else {
            setDays(state => [...state, <div className={'day ' + (currDayValue == i ? 'active' : '')} onClick={(e) => addActiveCurrDay(e)} key={Math.random() * 30}>{i}</div>])
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        setDays(state => [...state, <div className='day next-date ' onClick={(e) => addActiveCurrDay(e)} key={Math.random() * 67}>{j}</div>])
    }
}