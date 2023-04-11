const router = require('express').Router()
const jwt = require('jsonwebtoken')
const stripe_private_key = "sk_test_51MsJx8BSVFWfI6HzcSr5xDsoao3UelzYVOHVDcjO3SydFoCa4G00nWvTNx0A0DoVzLNLcHnKZYcnq6FOuaV9vXXR00mHJo9Cem"
const stripe = require('stripe')(stripe_private_key)
const URL = 'http://localhost:3060/'

const { authMiddleware } = require('../Middlewares/authMiddleware')

const storeItems = new Map([
    [1, { priceInCents: 100, name: 'Learn React Today' }],
    [2, { priceInCents: 200, name: 'Learn JS Today' }]
])

router.post('/create-checkout-session/:token', authMiddleware, async (req, res) => {
    try {
        const session = await stripe?.checkout?.sessions?.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items?.map(item => {
                const storeItem = storeItems.get(item.id)

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
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
