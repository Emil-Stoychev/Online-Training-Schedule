import { AddProgramComponent } from './add-program/Add-program'
import { CalendarComponent } from './calendar/Calendar'
import { NotesComponent } from './notes/Notes'
import './training.css'

export const TrainingComponent = ({ token, userId }) => {

    return (
        <>
            <CalendarComponent />

            <AddProgramComponent token={token} userId={userId} />

            <section className='training-notes'>

                <NotesComponent />

                <NotesComponent />

                <NotesComponent />

            </section>

        </>
    )
}