var html = require('choo/html')

module.exports = function () {
  return html`
    <footer class="bt b--black-10 black-70 pv4 ph3 ph5-m ph6-l">
      <small class="f6 db tc"><b class="ttu">Code for Science & Society</b></small>
      <div class="tc mt3">
        <a href="http://datproject.org" title="Dat Project" class="f6 dib ph2 link mid-gray dim">Dat Project</a>
        <a href="http://codeforscience.org" title="CSS Website" class="f6 dib ph2 link mid-gray dim">CSS Website</a>
      </div>
    </footer>
  `
}
