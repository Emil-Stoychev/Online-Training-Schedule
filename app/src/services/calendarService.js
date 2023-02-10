let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/calendar'

export const initCalendar = (token, year, month) => {
    return fetch(`${URL}/${token}/${year}/${month}`)
        .then(res => res.json())
}

export const getCurrDay = (token, year, month, day) => {
    return fetch(`${URL}/${token}/${year}/${month}/${day}`)
        .then(res => res.json())
}

export const createEvent = (data) => {
    return fetch(`${URL}/createEvent/${data.token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const toggleFinishEvent = (eventId, finish, token) => {
    return fetch(`${URL}/toggleFinishEvent/${eventId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId, finish, token })
    })
        .then(res => res.json())
}
