
let a = window.location.origin.split(':3060')

const URL = a[0] + ':3030/training'

export const getById = (trainingId) => {
    return fetch(`${URL}/${trainingId}`)
        .then(res => res.json())
}

export const getFullImage = (imageId) => {
    return fetch(`${URL}/fullImage/${imageId}`)
        .then(res => res.json())
}

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

export const getFastInfoAboutProgram = (trainingId) => {
    return fetch(`${URL}/fastInfo/${trainingId}`)
        .then(res => res.json())
}

// CATEGORIES

export const getAllCategories = (authorId) => {
    return fetch(`${URL}/categories/${authorId}`)
        .then(res => res.json())
}

export const getTrainingsByCategory = (categoryId) => {
    return fetch(`${URL}/trainingsByCategory/${categoryId}`)
        .then(res => res.json())
}