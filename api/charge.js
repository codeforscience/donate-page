const Stripe = require('stripe')
const secretKey = process.env.SECRET_KEY

module.exports = (req, res) => {
  if (!secretKey) {
    throw new Error('Stripe secret key required')
  }
  const stripe = Stripe(secretKey)
  const { amount, token } = req.body

  if (!amount) {
    return res.status(400).send({error: 'Amount Required'})
  }

  stripe.customers.create({
    email: token.email,
    card: token.id
  })
  .then(customer =>
    // save customer to db here if we want
    stripe.charges.create({
      amount: amount,
      description: 'Donation to Code for Science & Society',
      receipt_email: customer.email,
      currency: 'usd',
      customer: customer.id,
      metadata: {
        donation: true,
        source: 'donate.codeforscience.org'
      }
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.error('Stripe Processing Error:', err)
    if (err.type === 'StripeCardError') {
      return res.status(402).send({error: err.message})
    }
    // I think any other errors would be our fault?
    res.status(500).send({error: 'Donation Failed'})
  })
}