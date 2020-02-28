const Stripe = require('stripe')
const secretKey = process.env.SECRET_KEY

module.exports = (req, res) => {
  if (!secretKey) {
    throw new Error('Stripe secret key required')
  }
  const stripe = Stripe(secretKey)

  try {
    const { options } = req.body;
    const paymentIntent = await stripe.paymentIntents.create(options);
    res.json(paymentIntent);
  } catch (err) {
    console.error('PaymentIntent err', err)
    res.status(500).json(err)
  }
}