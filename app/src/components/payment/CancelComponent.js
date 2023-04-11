import { useNavigate } from 'react-router-dom'
import './payment.css'

const CancelComponent = ({ token, userId, onlineUsers }) => {
    const navigate = useNavigate()

    return (
        <>
            <section className='container'>
                <h2>You cannot purchased!</h2>
            </section>
        </>
    )
}

export default CancelComponent