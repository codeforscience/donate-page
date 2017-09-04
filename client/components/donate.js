var html = require('choo/html')

module.exports = donateView

function donateView (state, emit) {
  var donateProcessed = state.checkout.pending || (state.checkout.success || state.checkout.error)
  return html`
    <div>
      ${toggleLink('Donate via Credit Card or Bitcoin', state.bitcoinView)}
      ${toggleLink('(or anonymous Bitcoin)', !state.bitcoinView)}
      ${state.bitcoinView ? donateBitcoin() : donateButtons()}
      <p class="lh-copy f7 black-60 measure">
        ${state.bitcoinView ?
          'Donations are anonymous and not tax deducible. Bitcoins are sent directly to our wallet.'
          : 'Donations are processed via Stripe (per transation: CC, 2.2% + $0.30; Bitcoin, 0.8% cap at $5). We receive donation in USD minus fees.'
        }
      </p>
      ${donateProcessed ? donateResults() : ''}
    </div>
  `

  function toggleLink (text, linkify) {
    if (!linkify) return html`<h5 class="f5 mb1 dib color-neutral-80">${text}</h5>`
    return html`<a class="pl1 pr1 f6 dib link dim green" href="" onclick=${() => { emit('toggleBitcoinView') }}>${text}</a>`
  }

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
        We had trouble processing your donation:
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

  function donateBitcoin () {
    return html`
      <div class="mv0">
        <p class="f6 f4-ns w-50 tc b db pv3 ph3 link dim color-neutral-80 ba b--green">Coming Soon!</p>
      </div>
    `
  }

  function donateButtons () {
    const staticButtons = html`
      <ul class="list pl0 mb0">
        <li class="dib mr2 mb2">
          <a href="" onclick=${() => { emit('checkout', 1000) }} class="f6 f4-ns b db pv3 ph3 link dim color-neutral-80 ba b--green">$10</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="" onclick=${() => { emit('checkout', 2500) }} class="f6 f4-ns b db pv3 ph3 link dim color-neutral-80 ba b--green">$25</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="" onclick=${() => { emit('checkout', 5000) }} class="f6 f4-ns b db pv3 ph3 link dim color-neutral-80 ba b--green">$50</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="" onclick=${() => { emit('checkout', 10000) }} class="f6 f4-ns b db pv3 ph3 link dim color-neutral-80 ba b--green">$100</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="" onclick=${() => { emit('checkout', 25000) }} class="f6 f4-ns b db pv3 ph3 link dim color-neutral-80 ba b--green">$250</a>
        </li>
        <li class="dib mr2 mb2">
          <a href="" onclick=${() => { emit('toggleValInput')}} class="f6 f4-ns b db pv3 ph3 link dim color-neutral-80 ba b--green">Other</a>
        </li>
      </ul>
    `
    if (!state.showValInput) return staticButtons

    return html`
      <form class="mv3 cf" onsubmit=${(e) => submitOther(e)}>
        <label for="donate-amount" class="f6 f4-ns input-reset ba b--green fl b color-neutral-80 br-0 bg-neutral-04 pa3 br2 br--left">$</label>
        <input class="f6 f4-ns input-reset ba b--green fl color-neutral bg-white pa3 lh-solid w-50 bl-0 outline-0" placeholder="Donation Amount" type="text" name="donate-amount" value="${state.checkout.amount ? state.checkout.amount/100 : ''}" id="donate-amount" />
        <input class="f6 f4-ns button-reset b--green ba fl pv3 tc bg-animate bg-green hover-bg-green-hover white pointer w-20 br2 br--right outline-0" type="submit" onclick=${(e) => submitOther() } value="Donate" />
      </form>
    `

    function submitOther (e) {
      e.preventDefault()
      const value = document.getElementById('donate-amount').value
      if (!value) return
      emit('checkout', value * 100)
    }
  }
}
