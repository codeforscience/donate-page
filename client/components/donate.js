var html = require('choo/html')

module.exports = donateView

function donateView (state, emit) {
  var donateProcessed = state.checkout.pending || (state.checkout.success || state.checkout.error)
  return html`
    <div>
      <h5 class="f4 mv0 color-neutral-80">Donate via Stripe (tax-deductible)</h5>
      <h6 class="f6 mv1 color-neutral-60">We accept credit cards or Bitcoin</a>
      ${donateButtons()}
      <p class="lh-copy f7 black-60 measure">
        Donations are processed via Stripe (per transation: CC, 2.2% + $0.30; Bitcoin, 0.8% cap at $5). We receive donation in USD minus fees.
      </p>
      ${donateProcessed ? donateResults() : ''}
      <h5 class="f4 mb2 color-neutral-80">Donate Anonymous Bitcoin (not tax-deductible)</h5>
      ${donateBitcoin()}
      <p class="lh-copy f7 black-60 measure">
        Anonymous Bitcoin donations are not tax deducible. Bitcoins sent via Coinbase are sent directly to our wallet.
      </p>
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
      <div class="">
        <a class="mt2 f6 f4-ns tc b dib pv3 ph3 link dim color-neutral-80 ba b--green" href="https://www.coinbase.com/checkouts/ae8b9832ff5ebc3be45ba9b8cdd3f19b" target="_blank">Via Coinbase</a>
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
        <input class="f6 f4-ns input-reset ba b--green fl color-neutral bg-white pa3 lh-solid w-50 bl-0 br-0 outline-0" placeholder="Donation Amount" type="text" name="donate-amount" value="${state.checkout.amount ? state.checkout.amount/100 : ''}" id="donate-amount" />
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
