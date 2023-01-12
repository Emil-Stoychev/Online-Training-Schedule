import { useRef, useState } from "react"

export const NestedCommentComponent = ({ x, y, userId, updateComment, likeComment, deleteComment }) => {
    const [nestedToggleDelete, setNestedToggleDelete] = useState(false)
    const [nestedToggleEdit, setNestedToggleEdit] = useState({
        option: false,
        value: ''
    })
    const nestedDesc = useRef()

    const editNestedCommentHandler = () => {
        setNestedToggleEdit(state => ({
            option: !state.option,
            value: state.option ? '' : nestedDesc.current.innerHTML
        }))
    }

    const editNestedValueHandler = (e) => {
        setNestedToggleEdit(oldState => ({
            ...oldState,
            value: e.target.value
        }))
    }

    return (
        <>
            <div className='nested-comment'>
                <div className='top'>
                    <img src={y?.profileImage?.length > 0 &&
                        y?.profileImage[0]?.image != ''
                        ? y?.profileImage[0]?.image
                        : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />
                    <div>
                        <h2>{y?.username}</h2>
                        <p>{y?.location}</p>
                    </div>
                </div>

                <div className='main'>
                    {nestedToggleEdit.option
                        ?
                        <>
                            <input type='text' className='commentEditInput' value={nestedToggleEdit.value} onChange={editNestedValueHandler} />
                            <button className='editOptionBtn' onClick={() => updateComment(y?._id, 'nested', x._id, nestedToggleEdit.value, setNestedToggleEdit)}>✓</button>
                            <button className='editOptionBtn' onClick={() => editNestedCommentHandler()}>X</button>
                        </>
                        : <p ref={nestedDesc}>{y?.description}</p>
                    }
                </div>

                <div className='buttons'>
                    <i onClick={() => likeComment(y?._id, 'nested', x?._id)} className={`fa-solid fa-heart ${y?.likes?.includes(userId) && 'liked'}`}>{y?.likes?.length}</i>

                    {y?.authorId == userId &&
                        <>
                            <i onClick={() => editNestedCommentHandler()} className="fa-solid fa-pen-to-square"></i>

                            {nestedToggleDelete ?
                                <>
                                    <button onClick={() => deleteComment(y._id, x._id, setNestedToggleDelete)} className='deleteOptionBtn'>✓</button>
                                    <button onClick={() => setNestedToggleDelete(false)} className='deleteOptionBtn'>X</button>
                                </>
                                :
                                <i onClick={() => setNestedToggleDelete(x => !x)} className="fa-solid fa-trash"></i>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}