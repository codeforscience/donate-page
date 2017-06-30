var html = require('choo/html')

module.exports = donateView

function donateView (state, emit) {
  var donateProcessed = state.checkout.pending || (state.checkout.success || state.checkout.error)
  return html`
    <div>
      ${donateButtons()}
      ${donateProcessed ? donateResults() : ''}
    </div>
  `

  function donateResults () {
    var msg = ''
    var bgClass = ''

    if (state.checkout.pending) {
      bgClass = 'bg-lightest-blue'
      msg = 'We are processing your donation...'
    }

    if (state.checkout.success) {
      bgClass = 'bg-light-green'
      msg = `
        You donated $${state.checkout.amount / 100} to Code for Science & Society.
        Thank you!
      `
    }

    if (state.checkout.error) {
      bgClass = 'bg-light-red'
      msg = `
        We had trouble processing your credit card:
        ${state.checkout.error}
      `
    }

    return html`
      <section class="pv2 ph3 ${bgClass}">
        <p class="lh-copy measure">
          ${msg}
        </p>
      </section>
    `
  }

  function donateButtons () {
    return html`
      <ul class="list pl0">
        <li class="dib mr2 mb2">
          <a href="#" onclick=${() => { emit('checkout', 1000) }} class="f6 f5-ns b db pa3 link dim dark-gray ba b--black-20">$10</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="#" onclick=${() => { emit('checkout', 2500) }} class="f6 f5-ns b db pa3 link dim dark-gray ba b--black-20">$25</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="#" onclick=${() => { emit('checkout', 5000) }} class="f6 f5-ns b db pa3 link dim dark-gray ba b--black-20">$50</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="#" onclick=${() => { emit('checkout', 10000) }} class="f6 f5-ns b db pa3 link dim dark-gray ba b--black-20">$100</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="#" onclick=${() => { emit('checkout', 25000) }} class="f6 f5-ns b db pa3 link dim dark-gray ba b--black-20">$250</a>
        </li>
      </ul>
    `
  }
}
