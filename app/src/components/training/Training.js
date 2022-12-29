import { AddProgramComponent } from './add-program/Add-program'
import { CalendarComponent } from './calendar/Calendar'
import { NotesComponent } from './notes/Notes'
import './training.css'

export const TrainingComponent = () => {

    return (
        <>
            <CalendarComponent />

            <AddProgramComponent />

            <section className='training-notes'>

                <NotesComponent />

            </section>

        </>
    )
}