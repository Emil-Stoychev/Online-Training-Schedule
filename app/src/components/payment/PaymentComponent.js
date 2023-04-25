import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './payment.css'
import * as paymentService from '../../services/payment'

const PaymentComponent = ({ token, userId, onlineUsers }) => {
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
        if (state == null) {
            navigate('/404-not-found')
        }
    }, [])

    const payNow = (e) => {
        e.preventDefault()

        let data = state

        paymentService.createSession(token, data)
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
                    <div id="card-element">
                        <p>{state?.trainingProgramName}</p>
                        <h3>{state?.price} {state?.currency}</h3>
                    </div>
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