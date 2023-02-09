export const LoadingTraninigPost = () => {


    return (
        <>
            <div className='training-post'>

                <div className='training-post-profile blurOverlay'>
                    <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt='Profile image...' />
                    <div>
                        <h3>Loading...</h3>
                        <p>Loading...</p>
                    </div>
                </div>

                <h3 className='training-post-category blurOverlay'>Category: Loading...</h3>

                <h1>Loading...</h1>

                <hr />

                <div className='training-post-btns blurOverlay'>
                    <i className='fa-solid fa-heart liked' >7</i>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>

                <div className='training-post-main'>
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>

            </div >
        </>
    )
}