
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/chat'

export const userChats = (userId, token) => {
    return fetch(`${URL}/${userId}`)
        .then(res => res.json())
}

export const getMessages = (chatId, token) => {
    return fetch(`${URL}/message/${chatId}`)
        .then(res => res.json())
}

export const addMessage = (message, token) => {
    let data = {
        token,
        message,
    }

    return fetch(`${URL}/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
        .then(res => res.json())
}
