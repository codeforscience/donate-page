const key = process.env.PUBLISHABLE_KEY
module.exports = (req, res) => {
  res.json({ key: key })
}