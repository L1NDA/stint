import React, { Component } from 'react';
import { createCheckoutSession } from "../../api/stripe"
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PK } from "../../config"

const stripePromise = loadStripe(STRIPE_PK);

class CheckoutButton extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick = async (event) => {

      // Call your backend to create the Checkout Session—see previous step
      // const { sessionId } = await createCheckoutSession({}, 3, "asf", "asdg");
      const sessionData  = await createCheckoutSession({"name": "stint stuff"}, 100, "https://wearestint.com/hire", "https://wearestint.com/our-mission")
      // When the customer clicks on the button, redirect them to Checkout.

      const stripe = await stripePromise;

      let sessionId = sessionData.data
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });
      console.log(error.message)
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
    };

    render() {
        return (
          <button role="link" onClick={this.handleClick} className="button" style={{alignSelf: "flex-start", position: "absolute", right: "0", bottom: "0"}}>
            Checkout
          </button>
        );
      }
}

export default CheckoutButton;
