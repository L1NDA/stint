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
            <h1>Thanks! Your Stint booking has been sent. 🚀</h1>
            <h3 style={{fontWeight: "bold"}}>What’s next?</h3>
            <p>The student has received your request. To encourage fair compensation for student work, students have the option to negotiate a higher wage one time (we’ll notify you if this is the case). Otherwise, you’ll hear back when the student has accepted or denied the booking request.</p>
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
