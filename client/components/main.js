var html = require('choo/html')
var donate = require('./donate')

module.exports = donateView

function donateView (state, emit) {
  return html`
    <article class="cf ph3 ph5-ns pv4 color-neutral relative">
      <header class="fn fl-ns w-50-l pr4-ns">
        <h1 class="f3 mb3 mt0 lh-title">Support Technology for the Public Good</h1>
        <h2 class="f5 ttu tracked color-neutral-70">
          Code for Science & Society
        </h2>
        <div class="w-100 flex pv5-ns">
          <a href="http://datproject.org" title="Dat Project"><img src="/images/dat-logo.png" style="height:auto; width:180px;" alt="dat project logo" class="pr5-ns pr2 dn db-ns"/></a>
          <a href="http://codeforscience.org" title="CSS Website"><img src="/images/css-logo.png" style="height:auto; width:180px;" alt="code for science & society logo" class="dn db-ns"/></a>
        </div>
      </header>
      <div class="fn fl-ns w-50-l">
        <p class="lh-copy measure f5 mt4 mt0-ns ">
          <strong>Code for Science & Society</strong> (CSS), a registered US 501(c)(3), supports and builds open source projects with a focus on science, government, and journalism. Our primary initiative is the <a class="color-green link dim" href="http://datproject.org">Dat Project</a>. We also host other open source science programs such as <a class="color-green link dim" href="http://sciencefair-app.com/">Science Fair</a> and <a class="color-green link dim" href="http://stenci.la">Stencila</a>.
        </p>
        <p class="lh-copy measure f5  ">
          <strong>Why Donate?</strong> Primary funding for CSS comes through grants. Donations and community support help us get grants in the future. Even small donations are great!
        </p>
        <p class="lh-copy measure f5  ">
          <strong>What is my money spent on?</strong> 100% of your money directly supports folks producing open source software and building our community. Our employee headcount and salaries depend on our active grants. We have very little overhead and all earn the same amount of money. If you want your money to go to a specific project, please let us know! We love to hear what you are interested in.
        </p>
        <div class="pt1 mt2">
          ${donate(state, emit)}
        </div>
      </div>
      <footer class="w-100-m absolute-l fl-ns fn db-l bottom-2-l">
        <p class="lh-copy f7 color-neutral-60">
          Code for Science and Society is a registered US 501(c)(3) nonprofit.<br>Donations are tax deductible to the extent allowed by law in US.<br>Tax ID 81-3791683
        </p>
      </footer>
    </article>
  `
}
