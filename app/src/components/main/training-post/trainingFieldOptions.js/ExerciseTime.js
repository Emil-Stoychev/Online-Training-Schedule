export const ExerciseTimeComponent = ({ x, _id }) => {

    return (
        <p key={x?._id}>{x.author == _id && <i className="fa-solid fa-pen-to-square"></i>} Exercise time: <span>{x?.value}</span></p>
    )
}