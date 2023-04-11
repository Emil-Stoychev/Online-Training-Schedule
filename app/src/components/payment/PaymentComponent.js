import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './payment.css'
import * as paymentService from '../../services/payment'

const PaymentComponent = ({ token, userId, onlineUsers }) => {
    const navigate = useNavigate()

    let test = [
        { id: 1, name: 'Kardio', price: 1 },
        { id: 2, name: 'Biceps', price: 1 }
    ]

    const payNow = (e) => {
        e.preventDefault()

        let items = [
            { id: 1, quantity: 3 },
            { id: 2, quantity: 1 }
        ]

        paymentService.createSession(token, items)
            .then(res => {
                console.log(res)
                if (res.url) {
                    window.location = res?.url
                } else if (res) {
                    console.log(res);
                }
            })
    }

    return (
        <>
            <section className='container'>
                <form id="payment-form">
                    <div id="card-element">{test.map(x => <b key={x.id}>{x.price}, </b>)} BGN</div>
                    <button id="submit-payment" onClick={(e) => payNow(e)}>
                        <div className="spinner hidden" id="spinner"></div>
                        <span id="button-text">Pay now</span>
                    </button>
                    {/* <p id="card-error" role="alert"></p> */}
                    {/* <p className="result-message hidden">
                        Payment succeeded, see the result in your
                        <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
                    </p> */}
                </form>
            </section>
        </>
    )
}

export default PaymentComponent