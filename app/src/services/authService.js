
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/users'

const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('sessionStorage')
});

export const getUserById = (token, userId) => {
    return fetch(`${URL}/${token}/${userId}`)
        .then(res => res.json())
}

export const getUserByUsername = (token, searchValue) => {
    return fetch(`${URL}/getUserByUsernames/${token}/${searchValue}`)
        .then(res => res.json())
}

export const getByOption = (token, option, userId) => {
    return fetch(`${URL}/own/${token}/${option}/${userId}`)
        .then(res => res.json())
}

export const getAllNotifications = (userId, token, skipNum) => {
    return fetch(`${URL}/getAllNotifications/${userId}/${token}/${skipNum}`)
        .then(res => res.json())
}

export const getAllNotificationsNumber = (userId, token) => {
    return fetch(`${URL}/getAllNotificationsNumber/${userId}/${token}`)
        .then(res => res.json())
}

export const toggleSoundNot = (token, soundNotification) => {
    return fetch(`${URL}/toggleSoundNot/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ soundNotification })
    })
        .then(res => res.json())
}

export const readAllNotifications = (userId, token) => {
    return fetch(`${URL}/readAllNotifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, token })
    })
        .then(res => res.json())
}


export const toggleFollowPerson = (token, userId) => {
    return fetch(`${URL}/toggleFollow/${token}/${userId}`)
        .then(res => res.json())
}

export const register = (data) => {
    return fetch(`${URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const login = (data) => {
    return fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const emailVerification = (data) => {
    return fetch(`${URL}/emailVerification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const logout = (token) => {
    return fetch(`${URL}/logout/${token}`)
        .then(res => res.json())
}

export const getOwnPosts = (ownerId) => {
    return fetch(`${URL}/ownProducts/${ownerId}`)
        .then(res => res.json())
}

export const getLikedPosts = (ownerId) => {
    return fetch(`${URL}/likedProducts/${ownerId}`)
        .then(res => res.json())
}

export const editProfile = (values, userId, token) => {
    let data = {
        values,
        userId,
        token
    }

    return fetch(`${URL}/editProfile/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const deleteAccount = (password, token) => {
    let data = {
        password,
        token
    }

    return fetch(`${URL}/deleteAccount/${token}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}