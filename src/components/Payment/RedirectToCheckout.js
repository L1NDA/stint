import React, { Component } from 'react';
import { createCheckoutSession } from "../../api/stripe"
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PK } from "../../config"
import StripeCheckout from 'react-stripe-checkout'
import Loading from '../Auth/Loading'
import firebase from '../../firebase'

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
class RedirectToCheckout extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    getParams = function (url) {
      var params = {};
      var parser = document.createElement('a');
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return params;
    };

    redirectToCheckout = async (event) => {
      { freelanceruid, cusid } = getParams(window.location.href)

      let transactionRef = firebase.database.ref("transactions/" + freelanceruid + "/" + cusid)
      transactionRef.on("value", (snapshot) => {
        this.setState({
          snapshot.amountTotal,
          snapshot.amountToBeReceived,
          snapshot.amountToBePaidOut,
          snapshot.amountToBeKept,
          snapshot.stintDetails,
        })
      })

      let product_data = {
        name: "Stint with " + this.props.freelancerName, // replace xxx with name of freelancer - probably from this.props
        description: "A " + this.props.totalDays + " day stint with " + this.props.freelancerName + " for " + this.props.stintCategory + ".",
        images: [this.props.freelancerPhotoUrl], // image_url of freelancer
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
        this.redirectToCheckout()
        return (
          <Loading />
        );
      }
}

export default RedirectToCheckout;
