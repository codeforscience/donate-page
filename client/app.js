var html = require('choo/html')
var choo = require('choo')
var log = require('choo-log')
var css = require('sheetify')
var load = require('load-script2')
var xhr = require('xhr')
var main = require('./components/main')
var footer = require('./elements/footer')

css('tachyons')
css('dat-colors')
css('./app.css')

var app = choo()
app.use(log())
app.use(loadStripeCheckout)
app.use(handleDonate)
app.route('/', mainView)
app.route('/*', mainView)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body class="color-neutral">
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
  state.checkout = {}

  emitter.on('toggleBitcoinView', function () {
    state.bitcoinView = !state.bitcoinView
    emitter.emit('render')
  })
  emitter.on('toggleValInput', function () {
    state.showValInput = !state.showValInput
    emitter.emit('render')
  })

  emitter.on('checkout', function (amount) {
    state.checkout = Object.assign(state.checkout, {
      amount: amount,
      // force reset vals
      success: null,
      error: null,
      pending: true
    })
    emitter.emit('log:info', state.checkout)
    emitter.emit('render')

    if (!state.stripeLoaded) {
      emitter.once('stripeLoaded', function () {
        emitter.emit('checkout', amount)
      })
      return
    }

    // StripeCheckout is loaded as global variable with checkout.js
    var checkoutHandler = window.StripeCheckout.configure({
      key: state.stripeKey,
      locale: 'auto'
    })
    checkoutHandler.open({
      name: 'Code for Science & Society',
      description: `$${state.checkout.amount/100} Donation to Dat Project`,
      image: 'images/dat-logo.svg',
      token: handleCharge,
      panelLabel: 'Donate',
      bitcoin: true,
      amount: state.checkout.amount,
      billingAddress: true,
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
      state.checkout.chargePending = false
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
