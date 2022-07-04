import stripeImport from 'stripe'
import getOrderAmount from '../helpers/getOrderAmount.js'
const stripe = stripeImport(process.env.STRIPE_SECRET_KEY)

const paymentIntent = async (req, res) => {
  const product = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await getOrderAmount(product),
      currency: "usd",
      payment_method: product[0].pm,
      confirm: true
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    res.send(error.raw.message)
    console.log(error.raw.message)
  }
}

export {
  paymentIntent
}
