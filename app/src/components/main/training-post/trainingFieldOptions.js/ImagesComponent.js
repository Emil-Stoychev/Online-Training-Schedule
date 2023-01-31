export const ImagesComponent = ({ x, openFullImage }) => {
    return (
        <div className='training-post-main-images' key={x?._id}>
            {x?.image.map(x =>
                <img onClick={() => openFullImage(x._id)} key={x._id} src={x?.thumbnail} alt="" />
            )}
        </div>
    )
}