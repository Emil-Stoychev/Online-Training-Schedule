export const OwnPostsComponent = ({ user, navigate, optionWord }) => {
    return (
        <article className={`profile-info-posts ${optionWord == 'savedPosts' && 'saved'}`}>

            {user?.[optionWord]?.length == 0
                ? <h2 className='noItems'>{optionWord == 'savedPosts' ? 'No saved posts yet!' : 'No posts yet!'}</h2>
                :
                <>
                    {user?.[optionWord]?.map((x, i) =>
                        <div key={x._id + `${i}`} className='posts-small' onClick={() => navigate('/post/' + x._id)}>
                            {x?.images?.length > 0 && <img src={x?.images[0]?.dataString || ''} />}

                            <h2>{x?.description?.slice(0, 20) + '...'}</h2>
                        </div>
                    )}
                </>
            }


        </article>
    )
}