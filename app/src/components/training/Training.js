import { AddProgramComponent } from './add-program/Add-program'
import { CalendarComponent } from './calendar/Calendar'
import { NotesComponent } from './notes/Notes'
import './training.css'

export const TrainingComponent = ({ token, _id }) => {

    return (
        <>
            <CalendarComponent />

            <AddProgramComponent token={token} userId={_id} />

            <section className='training-notes'>

                <NotesComponent userId={_id} />

            </section>

        </>
    )
}