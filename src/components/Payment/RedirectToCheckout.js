import React, { Component } from 'react';
import { createCheckoutSession } from "../../api/stripe"
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PK } from "../../config"
import StripeCheckout from 'react-stripe-checkout'
import Loading from '../Auth/Loading'
import { getFreelancerRef } from '../../api/freelancer'
import { INDEX_URL } from '../../config'
import firebase from '../../firebase'

const stripePromise = loadStripe(STRIPE_PK);

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

    componentWillMount = () => {
      { freelanceruid, cusid } = getParams(window.location.href)
      this.setState({
        freelancerUid: freelanceruid,
        cusId: cusid,
      })
    }

    redirectIfNoTransactionExists = async () => {
      let transactionRef = firebase.database.ref("transactions/" + this.state.freelancerUid)
      transactionRef.on("value", (snapshot) => {
        if (snapshot.hasChild(this.state.cusId)) {
          this.props.history.push(INDEX_URL)
        }
      })
    }

    redirectToCheckout = async () => {
      { freelanceruid, cusid } = getParams(window.location.href)

      let transactionRef = firebase.database.ref("transactions/" + freelanceruid + "/" + cusid)
      transactionRef.on("value", (snapshot) => {
        this.setState({
          snapshot.amountTotal,
          snapshot.customerEmail,
          snapshot.amountToBeReceived,
          snapshot.amountToBePaidOut,
          snapshot.amountToBeKept,
          snapshot.stintDetails,
        })
      })

      // read from freelancerref and get name, photourl 
      let freelancerRef = getFreelancerRef(freelanceruid)
      freelancerRef.on("value", (snapshot) => {
        this.setState({
          freelancerName: snapshot.displayName,
          freelancerPhotoUrl: snapshot.avatarUrl,
        })
      })

      let product_data = {
        name: "Stint with " + this.state.freelancerName,
        description: "A " + this.state.stintDetails.numWeekdays + " day stint with " +
                            this.state.freelancerName + " for " +
                            this.state.stintDetails.category + ".",
        images: [this.state.freelancerPhotoUrl],
      }

      let metadata = {
        freelancerUid: freelanceruid,
        cusId: cusid,
        this.state.amountTotal,
        this.state.customerEmail,
        this.state.amountToBeReceived,
        this.state.amountToBePaidOut,
        this.state.amountToBeKept,
        this.state.stintDetails,
      }

      const sessionData  = await createCheckoutSession(
        product_data,
        this.state.amountTotal,
        "https://wearestint.com/hire" // redirectOnSuccessUrl
        "https://wearestint.com/our-mission", // redirectOnFailureUrl
        metadata,
      )

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
        this.redirectIfNoTransactionExists()
        this.redirectToCheckout()
        return (
          <Loading />
        );
      }
}

export default RedirectToCheckout;
