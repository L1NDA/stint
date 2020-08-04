import React, { Component } from 'react';
import { createCheckoutSession } from "../../api/stripe"
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PK } from "../../config"
import StripeCheckout from 'react-stripe-checkout'

const stripePromise = loadStripe(STRIPE_PK);


/*
  Props:
    freelancerName
    totalDays
    freelancerPhotoUrl
    freelancerUid
    startDate
    endDate
    stintCategory
    stintDescription
    totalHours
    hourlyRate
    totalAmount
    redirectOnSuccessUrl
    redirectOnFailUrl
*/
class CheckoutButton extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick = async (event) => {

      // Call your backend to create the Checkout Session—see previous step
      let product_data = {
        name: "Stint with " + this.props.freelancerName, // replace xxx with name of freelancer - probably from this.props
        description: "A " + this.props.totalDays + " day stint with " + this.props.freelancerName + " for " + this.props.stintCategory + ".",
        images: [this.props.freelancerPhotoUrl], // image_url of freelancer
      }

      let metadata = {
        freelancerUid: this.props.freelancerUid,
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        stintCategory: this.props.stintCategory,
        stintDescription: this.props.stintDescription,
        totalHours: this.props.totalHours,
        hourlyRate: this.props.hourlyRate,
      }

      const sessionData  = await createCheckoutSession(
        product_data,
        this.props.totalAmount, // Stripe takes cents, whereas our total amount is dollars currently
        this.props.redirectOnSuccessUrl,
        this.props.redirectOnFailUrl,
        metadata,
      )
      // When the customer clicks on the button, redirect them to Checkout.

      const stripe = await stripePromise;

      let sessionId = sessionData.data

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
          <button disabled={this.props.disabled} role="link" onClick={this.handleClick} className="button" style={{alignSelf: "flex-end"}}>
            Checkout
          </button>
        );
      }
}

export default CheckoutButton;
