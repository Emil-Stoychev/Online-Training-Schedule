
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/users'

const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('sessionStorage')
});

export const getUserById = (token) => {
    return fetch(`${URL}/${token}`)
        .then(res => res.json())
}

export const getByOption = (token, option) => {
    return fetch(`${URL}/own/${token}/${option}`)
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

export const updateUserPicture = (cookie, image) => {
    let data = {
        cookie,
        image
    }

    return fetch(`${URL}/changePicture/${cookie._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const deleteAccount = (cookie) => {
    let data = {
        cookie
    }

    return fetch(`${URL}/deleteAccount/${data._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}