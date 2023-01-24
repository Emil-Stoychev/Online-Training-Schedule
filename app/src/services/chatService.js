
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/chat'


export const createChat = (senderId, receiverId, token) => {
    // let data = {
    //     token,
    //     message,
    // }

    return fetch(`${URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ senderId, receiverId, token })
    })
        .then(res => res.json())
}

export const userChats = (userId, token) => {
    return fetch(`${URL}/${userId}`)
        .then(res => res.json())
}

export const getMessages = (chatId, skipNumber, token) => {
    return fetch(`${URL}/message/${chatId}/${skipNumber}`)
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
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const deleteMessage = (messageId, token) => {
    return fetch(`${URL}/deleteMessage/${messageId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
    })
        .then(res => res.json())
}
