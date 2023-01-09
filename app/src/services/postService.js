
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/posts'

export const getAllPosts = () => {
    return fetch(`${URL}`)
        .then(res => res.json())
}

export const getPostById = (id, token) => {
    return fetch(`${URL}/details/${id}/${token}`)
        .then(res => res.json())
}

export const createPost = (data) => {
    return fetch(`${URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}