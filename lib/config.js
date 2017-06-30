var fs = require('fs')
var path = require('path')
var yaml = require('js-yaml')

module.exports = load()

function load () {
  var str
  var config
  var filepath = path.join(__dirname, `../config.yml`)

  try {
    str = fs.readFileSync(filepath, 'utf8')
  } catch (e) {
    console.log('Error reading config')
    return {}
  }

  try {
    config = yaml.safeLoad(str)
  } catch (e) {
    console.log('Failed to parse config:', filepath, e)
    return {}
  }

  return config
}
