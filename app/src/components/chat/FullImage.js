export const FullImageComponent = ({ fullImages, setFullImages }) => {
    return (
        <>
            <div className="full-image">
                <span className="btn-to-close-full-image" onClick={() => setFullImages([])} >X</span>
                <img src={fullImages[0].image} alt="" />
            </div>
        </>
    )
}