import React, { Component } from 'react';
import createCheckoutSession from "../../api/stripe"


class CheckoutForm extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick = async (event) => {

      // Call your backend to create the Checkout Session—see previous step
      // const { sessionId } = await createCheckoutSession({}, 3, "asf", "asdg");
      const sessionData  = await createCheckoutSession({"name": "stint stuff"}, 1000, "https://wearestint.com/hire", "https://wearestint.com/our-mission")
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
          <button role="link" onClick={this.handleClick}>
            Checkout
          </button>
        );
      }
}

export default CheckoutForm;
