const router = require('express').Router()
const jwt = require('jsonwebtoken')
const stripe_private_key = "sk_test_51MsJx8BSVFWfI6HzcSr5xDsoao3UelzYVOHVDcjO3SydFoCa4G00nWvTNx0A0DoVzLNLcHnKZYcnq6FOuaV9vXXR00mHJo9Cem"
const stripe = require('stripe')(stripe_private_key)
const URL = 'http://localhost:3060/'

const { authMiddleware } = require('../Middlewares/authMiddleware')

router.post('/create-checkout-session/:token', authMiddleware, async (req, res) => {
    try {
        let items = [req.body.items]

        const session = await stripe?.checkout?.sessions?.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items?.map(item => {
                return {
                    price_data: {
                        currency: item.currency,
                        product_data: {
                            name: item.trainingProgramName
                        },
                        unit_amount: Math.round(Number(item.price) * 100)
                    },
                    quantity: 1
                }
            }),
            success_url: `${URL}success`,
            cancel_url: `${URL}cancel`,
        })

        res.json({ url: session?.url })
    } catch (error) {
        console.log(error);
        return { message: 'Error' }
    }
})

module.exports = router
