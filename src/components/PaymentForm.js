import React from 'react';
import {
  CardElement,
  Elements,
  injectStripe,
} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStripe } from './withStripe'
import api from '../api';

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        ...(padding ? {padding} : {}),
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _HandleCardPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state  = {
      clientSecret: null,
      error: null,
      disabled: true,
      succeeded: false,
      processing: false,
      message: ''
    };
  }
  
  async componentDidUpdate (prevProps) {
    if (this.props.amount > 0 && this.props.amount !== prevProps.amount) {
      api.createPaymentIntent({
        amount: this.props.amount,
        currency: 'usd',
        payment_method_types: ['card'],
        statement_descriptor_suffix: this.props.projectName.substring(0, 22),
        description: 'Donation to CS&S - ' + this.props.projectName,
        metadata: {
          project: this.props.projectId || '',
        }
      })
      .then((clientSecret) => {
        this.setState({clientSecret, disabled: false, error: ''});
        this.forceUpdate()
      })
      .catch((err) => {
        this.setState({error: err.message, disabled: true});
      });
    }
  }

  async componentDidMount() {
    api.createPaymentIntent({
        amount: this.props.amount,
        currency: 'usd',
        payment_method_types: ['card'],
        statement_descriptor_suffix: this.props.projectName.substring(0, 22),
        description: 'Donation to CS&S - ' + this.props.projectName,
        metadata: {
          project: this.props.projectId || '',
        }
      })
      .then((clientSecret) => {
        this.setState({clientSecret, disabled: false});
      })
      .catch((err) => {
        this.setState({error: err.message, disabled: true});
      });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      const name = ev.target.name.value
      const email = ev.target.email.value
      const billing = {...(name ? { name } : {})}
      if (email) billing.email = email
      
      this.props.stripe
        .confirmCardPayment(this.state.clientSecret, {
          receipt_email: email,
          payment_method: {
            card: this.props.elements.getElement('card'),
            billing_details: billing
          }})
        .then((payload) => {
          if (payload.error) {
            this.setState({
              error: `Charge failed: ${payload.error.message}`,
              disabled: false, 
              processing: false
            });
            console.log('[error]', payload.error);
          } else {
            this.setState({
              succeeded: true,
              message: `Charge succeeded! PaymentIntent is in state: ${
                payload.paymentIntent.status
              }`,
            });
            this.props.handlePayment({name, email})
          }
        });
      this.setState({disabled: true, processing: true});
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    const message = this.state.message || `Donating $${this.props.amount/100} to ${this.props.projectName}`
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="">
          Name
          <input name="name" type="text" placeholder="You" />
        </label>
        <label className="">
          Email
          <input
            name="email"
            type="email"
            placeholder="thank.you@example.com"
          />
        </label>
        <label>
          Credit Card
          <CardElement
            hidePostalCode
            {...createOptions(this.props.fontSize)}
          />
        </label>
        {this.state.error && <Typography className="error" color='secondary' gutterBottom>{this.state.error}</Typography>}
        {message && (
          <Typography className="message" gutterBottom>{message}</Typography>
        )}
        {!this.state.succeeded && (
          <Button type="submit" className="submit" variant="contained" color="primary" disabled={this.state.disabled}>
            {this.state.processing ? 'Processing…' : 'Submit'}
          </Button>
        )}
      </form>
    );
  }
}

const HandleCardPayment = injectStripe(_HandleCardPayment);

class _CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px'
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({elementFontSize: '14px'});
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({elementFontSize: '18px'});
      }
    });
  }

  render() {
    const {elementFontSize} = this.state;
    return (
      <div className="CheckoutForm">
        <Elements>
          <HandleCardPayment {...this.props} fontSize={elementFontSize} />
        </Elements>
      </div>
    );
  }
}

export default withStripe(_CheckoutForm)
