export const OwnTrainingsComponent = ({ user, navigate, optionWord }) => {
    return (
        <article className='profile-info-trainings'>

            {user?.[optionWord]?.length == 0
                ? <h2 className='noItems'>{optionWord == 'savedTrainings' ? 'No saved trainings yet!' : 'No trainings yet!'}</h2>
                :
                <>
                    {user?.[optionWord]?.map((x, i) =>
                        <div key={x._id + `${i}`}>
                            <img src={x?.images[0] || ''} />

                            <h2>{x?.description?.slice(0, 20) + '...'}</h2>
                        </div>
                    )}
                </>
            }

        </article>
    )
}