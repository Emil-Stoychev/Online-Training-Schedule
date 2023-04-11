import { useNavigate } from 'react-router-dom'
import './payment.css'

const PaymentComponent = ({ token, userId, onlineUsers }) => {
    const navigate = useNavigate()

    return (
        <section className='container'>
            <h2>You successfully purchased!</h2>
        </section>
    )
}

export default PaymentComponent