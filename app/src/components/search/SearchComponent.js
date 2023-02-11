import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './search.css'

import * as authService from '../../services/authService.js'


const SearchComponent = ({ token, _id }) => {
    const [users, setUsers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [loadingUsers, setLoadingUsers] = useState(false)
    const navigate = useNavigate()

    const onChangeValueHandler = (e) => {
        setSearchValue(e.currentTarget.value)
    }

    const searchUsers = () => {
        if (searchValue.trim() != '') {
            setLoadingUsers(true)

            authService.getUserByUsername(token, searchValue)
                .then(res => {
                    setLoadingUsers(false)
                    if (res.length > 0) {
                        setUsers(res)
                    } else {
                        setUsers([])
                    }
                })
        } else {
            setUsers([])
        }
    }

    return (
        <section className='container'>
            <div className="search-cont">
                <input type='search' value={searchValue} onChange={(e) => onChangeValueHandler(e)} placeholder='Search' />
                <button onClick={() => searchUsers()} >Search</button>
            </div>

            <div className='search-users-cont'>

                {users.length == 0 && !loadingUsers && <h2 className='noUsersFound'>No users found!</h2>}

                {loadingUsers && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}

                {users.length > 0 && !loadingUsers && users?.map((x, i) =>
                    <article className='search-users-curr' key={x._id + `${i}`} onClick={() => navigate(`/profile/${x._id}`)}>
                        <div className="search-users-curr-cnt" >
                            <div className='search-users-curr-leftSide'>
                                <img src={x?.image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt='Profile image...' />

                                <div>
                                    <h3>{x?.username} {x?._id == _id && '(you)'}</h3>
                                    <p>{x?.location}</p>
                                </div>
                            </div>

                            <div className='search-users-curr-rightSide'>
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        </div>
                    </article>
                )}
            </div>
        </section>
    )
}
export default SearchComponent
