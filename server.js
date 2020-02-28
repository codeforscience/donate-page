var express = require('express')
  var app = express();
const request = require("request");
const Stripe = require('stripe')
var bodyParser = require('body-parser')
const stripe = Stripe("sk_test_lyblIzvfT1ylkmT1q6xDDUHE")


app.use(bodyParser.json())

// app.use(express.static('public'));

app.get('/ping', function(request, response) {
  response.send('pong')
})

const errToJSON = ({name, message, stack}) => ({name, message, stack})

app.post("api/payment_intents", async (req, res) => {
  try {
    const { options } = req.body;
    const paymentIntent = await stripe.paymentIntents.create(options);
    res.json(paymentIntent);
  } catch (err) {
    console.error('PaymentIntent err', err)
    res.status(500).json(err)
  }

});

app.use("/", function(req, res) {
  request("http://localhost:8000" + req.path)
    .on("error", err => {
      console.log('Error - middleware')
      console.log(err)
      const restartScript = "<script>setTimeout(() => location.href = '/', 300)</script>"
      return res.send("client not started yet, try refreshing in a few seconds" + restartScript)
    })
    .pipe(res)
});


var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
