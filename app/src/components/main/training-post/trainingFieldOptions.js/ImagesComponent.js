export const ImagesComponent = ({ x, _id, openFullImage }) => {
    return (
        <div className='training-post-main-images' key={x?._id}>
            {x?.image.map(x =>
                <img onClick={() => openFullImage(x._id)} key={x._id} src={x?.thumbnail} alt="" />
            )}
            <h2 className='add-training-image'>+</h2>
            {/* {x.author == _id && <h2 className="fa-solid fa-pen-to-square add-training-image"></h2>} */}
        </div>
    )
}