const { Calendar } = require('../Models/Calendar')
const { Month } = require('../Models/Months')
const { Day } = require('../Models/Days')
const { DayEvent } = require('../Models/DaysEvents')
const { getUserById, getUserByIdInitCalendar, addNewCalendarYearToUser, getUserByIdCalendarCurrDay } = require('./authService')

const initCalendar = async (year, month, userId) => {
    try {
        let user = await getUserByIdInitCalendar(userId, year, month)

        if (user.calendar.length == 0) {
            let newCalendar = await Calendar.create({
                year,
                author: user._id
            })

            await addNewCalendarYearToUser(userId, newCalendar._id)

            return newCalendar
        }

        return user.calendar[0]
    } catch (error) {
        console.error(error)
        return error
    }
}

const getCurrDay = async (year, month, day, userId) => {
    try {
        let user = await getUserByIdCalendarCurrDay(userId, year, month, day)

        let result = user?.calendar[0]?.months[0]?.days[0]?.events.length > 0 ? user.calendar[0].months[0].days[0].events : { message: 'Empty' }

        return result
    } catch (error) {
        console.error(error)
        return error
    }
}

const createEvent = async (container, year, month, day, userId) => {
    try {
        let user = await getUserByIdCalendarCurrDay(userId, year, month, day)

        let currCalendarYear = user.calendar[0] || undefined
        let currCalendarMonth = currCalendarYear.months[0] || undefined
        let currCalendarDay = currCalendarMonth != undefined ? currCalendarMonth.days[0] : undefined

        if (!currCalendarYear?._id) {
            currCalendarYear = await Calendar.create({
                year,
                author: user._id
            })

            await addNewCalendarYearToUser(userId, currCalendarYear._id)
        }

        if (!currCalendarMonth?._id) {
            currCalendarMonth = await Month.create({
                month,
                author: user._id,
                yearId: currCalendarYear._id
            })

            await Calendar.findByIdAndUpdate({ _id: currCalendarYear._id }, { $push: { months: currCalendarMonth._id } })
        }

        if (!currCalendarDay?._id) {
            currCalendarDay = await Day.create({
                author: user._id,
                day,
                yearId: currCalendarYear._id,
                monthId: currCalendarMonth._id,
            })

            await Month.findByIdAndUpdate({ _id: currCalendarMonth._id }, { $push: { days: currCalendarDay._id } })
        }

        let createdEvent = await DayEvent.create({
            author: user._id,
            name: container.name,
            timeFrom: container.timeFrom,
            timeTo: container.timeTo,
            finish: false,
            dayId: currCalendarDay._id
        })

        await Day.findByIdAndUpdate({ _id: currCalendarDay._id }, { $push: { events: createdEvent._id } })

        return createdEvent || { message: 'Empty' }
    } catch (error) {
        console.error(error)
        return error
    }
}

const toggleFinishEvent = async (eventId, oldFinish, userId) => {
    try {
        return await DayEvent.findByIdAndUpdate({ _id: eventId }, { finish: !oldFinish })
    } catch (error) {
        console.error(error)
        return error
    }
}

const deleteEvent = async (eventId, userId) => {
    try {
        let event = await DayEvent.findById(eventId).populate('dayId')

        if (event.author != userId) {
            return { message: 'You cannot delete this event!' }
        }

        await DayEvent.findByIdAndDelete(eventId)

        await Day.findByIdAndUpdate({ _id: event.dayId._id }, { $pull: { events: eventId } })

        return eventId
    } catch (error) {
        console.error(error)
        return error
    }
}
module.exports = {
    initCalendar,
    getCurrDay,
    createEvent,
    toggleFinishEvent,
    deleteEvent
}

