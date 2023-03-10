import { useEffect, useState } from 'react'
import { AddProgramComponent } from './add-program/Add-program'
import { CalendarComponent } from './calendar/Calendar'
import { NotesComponent } from './notes/Notes'
import './training.css'
import * as trainingService from '../../services/trainingService.js'


const TrainingComponent = ({ token, _id }) => {
    const [categories, setCategories] = useState([])
    const [categoriesEmpty, setCategoriesEmpty] = useState(false)

    useEffect(() => {
        window.onload = window.scrollTo(0, 0)

        trainingService.getAllCategories(_id)
            .then(res => {
                if (!res.message) {
                    setCategoriesEmpty(false)
                    setCategories(res)
                } else {
                    if (res.message == 'Empty') {
                        setCategoriesEmpty(true)
                    } else {
                        setCategoriesEmpty(false)
                    }
                }
            })
    }, [])

    useEffect(() => {
        if (categories.length == 0) return setCategoriesEmpty(true)
    }, [categories])

    return (
        <>
            <CalendarComponent token={token} userId={_id} />

            <AddProgramComponent token={token} userId={_id} setCategories={setCategories} categories={categories} categoriesEmpty={categoriesEmpty} />

            <section className='training-notes'>

                <NotesComponent token={token} userId={_id} setCategories={setCategories} categories={categories} categoriesEmpty={categoriesEmpty} setCategoriesEmpty={setCategoriesEmpty} />

            </section>

        </>
    )
}

export default TrainingComponent
