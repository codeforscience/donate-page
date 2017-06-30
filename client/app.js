var html = require('choo/html')
var choo = require('choo')
var log = require('choo-log')
var css = require('sheetify')
var load = require('load-script2')
var xhr = require('xhr')
var main = require('./components/main')
var footer = require('./elements/footer')

css('tachyons')

var app = choo()
app.use(log())
app.use(loadStripeCheckout)
app.use(handleDonate)
app.route('/', mainView)
app.route('/*', mainView)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body class="sans-serif">
      ${main(state, emit)}
      ${footer()}
    </body>
  `
}

function loadStripeCheckout (state, emitter) {
  load('https://checkout.stripe.com/checkout.js', function (err, script) {
    if (err) return emitter.emit('log:error', err)

    xhr({
      uri: '/stripe-key',
      json: true
    }, function (err, resp, body) {
      emitter.emit('log:debug', body)
      if (err || resp.statusCode !== 200) {
        return emitter.emit('log:error', 'Error loading stripe')
      }

      state.stripeKey = body.key
      state.stripeLoaded = true
      emitter.emit('stripeLoaded')
      emitter.emit('log:info', 'loaded stripe checkout.js')
    })
  })
}

function handleDonate (state, emitter) {
  state.checkout ={
    amount: 500, // default donation
    success: null,
    error: null,
    pending: false
  }

  emitter.on('checkout', function (amount) {
    state.checkout.pending = true
    emitter.emit('render')

    if (!state.stripeLoaded) {
      emitter.once('stripeLoaded', function () {
        emitter.emit('checkout')
      })
      return
    }

    if (amount) state.checkout.amount = amount

    // StripeCheckout is loaded as global variable with checkout.js
    var checkoutHandler = StripeCheckout.configure({
      key: state.stripeKey,
      locale: 'auto'
    })
    checkoutHandler.open({
      name: 'Code for Science & Society',
      description: 'Donation to Dat Project',
      image: 'images/dat-logo.svg',
      token: handleCharge,
      panelLabel: 'Donate',
      amount: state.checkout.amount,
      billingAddress: true,
      zipCode: true,
      closed: function () {
        if (!state.checkout.chargePending) {
          state.checkout.pending = false
          emitter.emit('render')
        }
      }
    })
  })

  function handleCharge (token) {
    state.checkout.chargePending = true
    xhr({
      uri: '/charge',
      method: 'POST',
      body: { token: token, amount: state.checkout.amount },
      json: true,
      headers: { 'Content-Type': 'application/json' }
    }, function (err, resp, body) {
      state.checkout.pending = false
      state.checkout.chargePending = true
      if (err || resp.statusCode !== 200) {
        state.checkout.error = body.error || 'Error processing donation'
        emitter.emit('log:error', body.error)
        if (err) emitter.emit('log:error', err)
      } else {
        state.checkout.success = true
        emitter.emit('log:debug', resp)
      }
      emitter.emit('render')
    })
  }
}
