
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/training'


export const createProgram = (token, userId, data) => {
    return fetch(`${URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data, token, userId })
    })
        .then(res => res.json())
}