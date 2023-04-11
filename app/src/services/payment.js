
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/payment'

export const createSession = (token, items) => {
    return fetch(`${URL}/create-checkout-session/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, items })
    })
        .then(res => res.json())
}