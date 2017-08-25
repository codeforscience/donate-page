const path = require('path')
const express = require('express')
const Stripe = require('stripe')
const bodyParser = require('body-parser')
const StripeDat = require('stripe-dat')
const config = require('./lib/config')

const port = config.port || process.env.PORT
const secretKey = config.stripe && config.stripe.keySecret ? config.stripe.keySecret : process.env.SECRET_KEY
const publicKey = config.stripe && config.stripe.keyPublishable ? config.stripe.keyPublishable : process.env.PUBLISHABLE_KEY

// Stripe Dat Config (stores donations in hypercore)
const storage = path.join(__dirname, 'data') // TODO: config for server
const startDate = new Date('1/1/2017')

if (!secretKey) {
  throw new Error('Stripe secret key required')
}

const app = express()
const stripe = Stripe(secretKey)
const sDat = StripeDat(secretKey, storage, {
  filter: function (charge) {
    if (charge.metadata && charge.metadata.donation) return true
    return charge.description.indexOf('Donation to') > -1
  },
  anonymize: true,
  fee: { pct: 0.022, amt: 0.3} // nonprofit fees =)
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/stripe-key', (req, res) => {
  // gotta be a better way to do this...
  // or just server side render js?
  res.json({ key: publicKey })
})

app.get('/donations', (req, res) => {
  sDat.getCharges(startDate, function (err, charges) {
    if (err) return res.status(500).send({error: err})
    res.json(charges)
  })
})

app.post('/charge', (req, res) => {
  if (!req.body.amount) {
    return res.status(400).send({error: 'Amount Required'})
  }

  stripe.customers.create({
    email: req.body.token.email,
    card: req.body.token.id
  })
  .then(customer =>
    // save customer to db here if we want
    stripe.charges.create({
      amount: req.body.amount,
      description: 'Donation to Code for Science & Society',
      receipt_email: customer.email,
      currency: 'usd',
      customer: customer.id,
      metadata: {
        'donation': true,
        'source': 'donate.datproject.org'
      }
    }))
  .then(charge => {
    sDat.addCharge(charge, function (err) {
      if (err) console.error(err)
      res.send(charge)
    })
  })
  .catch(err => {
    console.error('Stripe Processing Error:', err)
    if (err.type === 'StripeCardError') {
      return res.status(402).send({error: err.message})
    }
    // I think any other errors would be our fault?
    res.status(500).send({error: 'Donation Failed'})
  })
})

app.listen(port, () => {
  console.log(`app started on http://127.0.0.1:${port}`)
})
