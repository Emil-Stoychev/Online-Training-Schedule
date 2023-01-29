import { useState } from 'react'
import { AddProgramComponent } from './add-program/Add-program'
import { CalendarComponent } from './calendar/Calendar'
import { NotesComponent } from './notes/Notes'
import './training.css'

export const TrainingComponent = ({ token, _id }) => {
    const [categories, setCategories] = useState([])


    return (
        <>
            <CalendarComponent />

            <AddProgramComponent token={token} userId={_id} setCategories={setCategories} />

            <section className='training-notes'>

                <NotesComponent token={token} userId={_id} setCategories={setCategories} categories={categories} />

            </section>

        </>
    )
}