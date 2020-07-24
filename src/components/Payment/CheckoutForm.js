import React, { Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import createCheckoutSession from "../../api/stripe"

const stripePromise = loadStripe('pk_test_51GwtRRKhM1dSlL34AnTKoowDLOA8CVwr1MmV0r1YcMxbWoesYlYnEDR3oPh0luqTEXJ1VzJ8kbOeN8b9mI5OhYHy00tzGPnvEE');

class CheckoutForm extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick = async (event) => {

      // Call your backend to create the Checkout Session—see previous step
      // const { sessionId } = await createCheckoutSession({}, 3, "asf", "asdg");
      const { sessionId } = await createCheckoutSession({}, 3, "asf", "asdg");
      // When the customer clicks on the button, redirect them to Checkout.
      // const stripe = await stripePromise;
      // const { error } = await stripe.redirectToCheckout({
      //   sessionId,
      // });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
    };

    render() {
        return (
          <button role="link" onClick={this.handleClick}>
            Checkout
          </button>
        );
      }
}

export default CheckoutForm;
