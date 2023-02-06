import { useEffect, useState } from 'react'
import { AddProgramComponent } from './add-program/Add-program'
import { CalendarComponent } from './calendar/Calendar'
import { NotesComponent } from './notes/Notes'
import './training.css'
import * as trainingService from '../../services/trainingService.js'


const TrainingComponent = ({ token, _id }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        trainingService.getAllCategories(_id)
            .then(res => {
                if (!res.message) {
                    setCategories(res)
                }
            })
    }, [])

    return (
        <>
            <CalendarComponent />

            <AddProgramComponent token={token} userId={_id} setCategories={setCategories} categories={categories} />

            <section className='training-notes'>

                <NotesComponent token={token} userId={_id} setCategories={setCategories} categories={categories} />

            </section>

        </>
    )
}

export default TrainingComponent
