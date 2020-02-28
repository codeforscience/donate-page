import React from 'react';
import loadjs from 'loadjs'
import {
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

const APIKEY = process.env.PUBLISHABLE_KEY || "pk_test_RBm2ygIjc7dTtTRgicMho96a"
const isStripeLoaded = () => typeof window !== 'undefined' && 'Stripe' in window
const loadStripe = async () =>
  new Promise(resolve =>
    isStripeLoaded() ? resolve(window.Stripe) : loadjs('https://js.stripe.com/v3/', resolve)
  )

export const withStripe = WrappedComponent =>
  class StripeDecorator extends React.Component {
    constructor(props) {
      super(props)
      this.state = { stripe: null, loadingStripe: false }
    }

    async componentDidMount() {
      if (!this.state.stripe && !this.state.loadingStripe) {
        this.setState({ loadingStripe: true })
        await loadStripe()
      }
      const stripe = window.Stripe(APIKEY)
      this.setState({ loadingStripe: false, stripe })
    }

    render() {
      if (!this.state.stripe) return <pre>Stripe loading ...</pre>

      return (
        <StripeProvider stripe={this.state.stripe}>
          <Elements>
            <WrappedComponent {...this.props} />
          </Elements>
        </StripeProvider>
      )
    }
  }

