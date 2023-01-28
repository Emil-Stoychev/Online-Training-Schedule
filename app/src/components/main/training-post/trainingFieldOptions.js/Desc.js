export const DescComponent = ({ x, _id }) => {

    return (
        <p key={x?._id}>{x.author == _id && <i className="fa-solid fa-pen-to-square"></i>} {x?.value}</p>
    )
}