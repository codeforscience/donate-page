var html = require('choo/html')
var donate = require('./donate')

module.exports = donateView

function donateView (state, emit) {
  return html`
    <article class="cf ph3 ph5-ns pv5">
      <header class="fn fl-ns w-50-l pr4-ns black-70">
        <h1 class="f3 mb3 mt0 lh-title">Support Technology for the Public Good</h1>
        <h2 class="f5 ttu tracked gray">
          Code for Science & Society
        </h2>
        <div class="w-100 flex pv5">
          <a href="http://datproject.org" title="Dat Project"><img src="/images/dat-logo.svg" style="height:200px; width:auto;" alt="dat project logo" class=""/></a>
          <a href="http://codeforscience.org" title="CSS Website"><img src="/images/css-logo.png" style="height:200px; width:auto;" alt="code for science & society logo" class="pl4"/></a>
        </div>
      </header>
      <div class="fn fl-ns w-50-l">
        <p class="lh-copy measure f5 mt4 mt0-ns black-70">
          <strong>Code for Science & Society</strong> (CSS) supports and builds open source projects with a focus on science, government, and journalism. Our primary initiative is the <a href="http://datproject.org">Dat Project</a>. We also host other open source science programs such as <a href="http://sciencefair-app.com/">Science Fair</a> and <a href="http://stenci.la">Stencila</a>.
        </p>
        <p class="lh-copy measure f5 black-70">
          <strong>Why Donate?</strong> Primary funding for CSS comes through grants. Donations shows current and future funders that people support our work. This will help us get grants in the future. Even small donations are great!
        </p>
        <p class="lh-copy measure f5 black-70">
          <strong>What is my money spent on?</strong> 100% of your money directly supports folks producing open source software and building our community. Our employee headcount and salaries depend on our active grants. We have very little overhead and all earn the same amount of money. If you want your money to go to a specific project, please let us know! We love to hear what you are interested in.
        </p>
        <div class="pv1">
          ${donate(state, emit)}
        </div>
        <p class="lh-copy f6 black-60">
          Code for Science and Society is a registered 501(c)(3) nonprofit.<br>Donations are tax deductible to the extent allowed by law.<br>Tax ID 81-3791683
        </p>
      </div>
    </article>
  `
}
