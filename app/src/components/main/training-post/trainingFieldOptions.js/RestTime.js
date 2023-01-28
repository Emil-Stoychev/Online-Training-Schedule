export const RestTimeComponent = ({ x, _id }) => {

    return (
        <p key={x?._id}>{x.author == _id && <i className="fa-solid fa-pen-to-square"></i>} Rest time: <span>{x?.value}</span></p>
    )
}