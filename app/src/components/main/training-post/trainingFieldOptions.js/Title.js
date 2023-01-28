export const TitleComponent = ({ x, _id }) => {

    return (
        <h2>{x.author == _id && <i className="fa-solid fa-pen-to-square"></i>} {x?.value}</h2>
    )
}