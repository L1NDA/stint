import React, { Component } from 'react';
import { createCheckoutSession, retrieveCheckoutSession, listAllCustomers } from "../../api/stripe"
import { loadStripe } from '@stripe/stripe-js' 
import { STRIPE_PK } from "../../config"
import StripeCheckout from 'react-stripe-checkout'

const stripePromise = loadStripe(STRIPE_PK);

class CheckoutButton extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick = async (event) => {

      // Call your backend to create the Checkout Session—see previous step
      let product_data = {
        name: "Stint with xxx", // replace xxx with name of freelancer - probably from this.props
        description: "freelancer_uid", // self-explanatory
        images: ["https://firebasestorage.googleapis.com/v0/b/stint-staging-eb100.appspot.com/o/images%2FSjia8zvNclQcaL2J3bJnBTwUYAa2%2Fprofilepic-logo.png?alt=media&token=f471062f-c513-4179-8753-329e5bff20c7"], // image_url of freelancer
      }

      let metadata = {
        freelancerUid: "plswork",
        startDate: "startdateisostring",
        endDate: "enddateisostring",
        stintCategory: "category here",
        stintDescription: "description here",
        totalHours: 10,
      }

      const sessionData  = await createCheckoutSession(product_data, 100, "https://wearestint.com/hire", "https://wearestint.com/our-mission", metadata)
      // When the customer clicks on the button, redirect them to Checkout.
      
      const stripe = await stripePromise;

      let sessionId = sessionData.data

      // let checkoutSession = await retrieveCheckoutSession(sessionId)
      // console.log("checkoutSession", checkoutSession)

      let customerList = await listAllCustomers("cma4@bu.edu")
      console.log("customer list", customerList)

      const { error } = stripe.redirectToCheckout({
        sessionId,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      if (error) {
        console.error(error.message)
      }
    };

    render() {
        return (
          <button role="link" onClick={this.handleClick}>
            Checkout
          </button>
        );
      }
}

export default CheckoutButton;
