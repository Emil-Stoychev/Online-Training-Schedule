import { useEffect, useState } from 'react'
import './add-program.css'

import * as trainingService from '../../../services/trainingService.js'

import { InputOptionsComponent } from './InputOptions';
import { ProgramBtnsAdd } from './ProgramBtnsAdd';

export const AddProgramComponent = ({ token, userId }) => {
    const [container, setContainer] = useState([])
    const [category, setCategory] = useState({
        option: true,
        value: ''
    })

    const onCreateBtnHandler = () => {
        let data = {
            container,
            category
        }

        trainingService.createProgram(token, userId, data)
            .then(res => console.log(res))
    }

    return (
        <section className='add-program'>
            <h1>Add program</h1>

            <ProgramBtnsAdd
                setCategory={setCategory}
                category={category}
                setContainer={setContainer}
            />

            <div className='add-option'>
                {container.length > 0 &&
                    container.map((x) =>
                        <InputOptionsComponent
                            key={Object.values(x)[0]?.id}
                            current={Object.values(x)[0]}
                            setContainer={setContainer}
                            container={container}
                        />
                    )
                }
            </div>

            <button className='last-btn' onClick={() => onCreateBtnHandler()}>Create</button>

        </section>
    )
}