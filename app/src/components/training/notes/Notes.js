import { Fragment, useEffect, useState } from 'react'
import './notes.css'

import * as trainingService from '../../../services/trainingService.js'
import { ShowPrograms } from './ShowPrograms'

export const NotesComponent = ({ token, userId, setCategories, categories, categoriesEmpty }) => {
    useEffect(() => {
        trainingService.getAllCategories(userId)
            .then(res => {
                if (!res.message) {
                    setCategories(res)
                }
            })
    }, [])


    return (

        <article className='notes-category'>
            <h1 className='notes-category-main-header'>Your Categories</h1>
            <hr />

            {categories.length > 0
                ? categories.map(x => <ShowPrograms token={token} key={x._id} x={x} userId={userId} setCategories={setCategories} />)
                :
                categoriesEmpty
                    ? <h1 className='notes-category-main-header'>You don't have categories yet!</h1>
                    :
                    !categories.length > 0 && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            }
        </article >
    )
}