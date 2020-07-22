import React from 'react'
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const {stripe, elements} = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  render() {
    const {stripe} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => (
        <CheckoutForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm;
