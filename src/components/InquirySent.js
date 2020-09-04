import React from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import "./style/other.css";
import Menu from "./Menu.js";
import Footer from "./Footer.js";
import paymentSuccess from "./imgs/payment-success.svg";

import { COMPANY_PATH } from "../constants/ROUTING_CONSTANTS"

class InquirySent extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  redirectToHirePage = () => {
    this.props.history.push(COMPANY_PATH)
  }

  render() {
    return (
      <div className="container flex-column" style={{height: "100vh"}}>
        <Menu />

        <div
          className="payment-container padding"
          style={{flexDirection: "row"}}
        >
          <div className="company-text flex-column">
            <h1>Thanks! We got your payment. 💸</h1>
            <h3>
              Your money is safe in our holdings for now. We’ve notified the student about your request, and we’ll get back to you with their response within 24 hours.
            </h3>
            <h3 style={{fontWeight: "bold"}}>What’s next?</h3>
            <p>To encourage fair compensation for student work, students can negotiate for a pay amendment one time if they believe they deserve a higher wage than what is offered. We’ll notify you if this is the case.
              <br/> <br/>
              Once the student accepts your offer, work begins! After the first project quarter is up, we will begin to transfer the student’s payment to their bank account at the agreed upon hourly wage, including their pay for the first quarter.
              <br/> <br/>
              If you’re not happy with the student’s work, no worries! Just let us know before the first quarter is up, and we’ll refund you in full.
            </p>
            <br/> <br/>
            <button onClick={this.redirectToHirePage} className="button">Return to homepage</button>
          </div>
          <img src={paymentSuccess} className="homepage-image company-image" />

        </div>


        <Footer />
      </div>
    );
  }
}

export default compose(withRouter)(InquirySent);
