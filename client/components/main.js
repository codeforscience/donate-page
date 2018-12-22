var html = require('choo/html')
var donate = require('./donate')

module.exports = donateView

function donateView (state, emit) {
  return html`
    <article class="cf ph3 ph5-ns pv4 color-neutral relative">
      <header class="fn fl-ns w-50-l pr4-ns">
        <h1 class="f3 mb3 mt0 lh-title">Support Technology for the Public Good</h1>
        <div class="w-100 flex pv3-ns">
          <a href="http://codeforscience.org" title="CSS Website"><img src="/images/css-logo.png" style="height:auto; max-width:250px;" alt="code for science & society logo" class="dn db-ns"/></a>
        </div>
      </header>
      <div class="fn fl-ns w-50-l">
        <p class="lh-copy measure f5 mt4 mt0-ns ">
          <strong>Code for Science & Society</strong> (CS&S) is a 501c3 nonprofit that works across research, government, journalism, and new media to create innovative technology for the public good. Across industries, people are working to reimagine systems that allow ideas and data to flow freely, but these groups often work in isolation and face technical and financial hurdles. We convene experts from across domains to solve common problems with reusable collaborative methods and infrastructure. As a fiscal sponsor and an active open scholarship community member, we have worked with people and projects at all stages of development - from supporting small open source project leaders to managing multi-institutional collaborations. We believe that building collaborative networks and developing open resources that share community knowledge is critical to advancing research.
        </p>
        <!-- <p class="lh-copy measure f5  ">
          <strong>Why Donate?</strong> Primary funding for CSS comes through grants. Donations and community support help us get grants in the future. Even small donations are great!
        </p>
        <p class="lh-copy measure f5  ">
          <strong>What is my money spent on?</strong> 100% of your money directly supports folks producing open source software and building our community. Our employee headcount and salaries depend on our active grants. We have very little overhead and all earn the same amount of money. If you want your money to go to a specific project, please let us know! We love to hear what you are interested in.
        </p> -->
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
