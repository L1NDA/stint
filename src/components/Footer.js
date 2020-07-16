import React from "react";
import logo from "./imgs/logo.png";

class Footer extends React.Component {
  render() {
    return (
      <div
        className="footer flex-row"
        style={{ justifyContent: "space-between" }}
      >
        Stint is made with ♥ from our (socially distant) living rooms
        <a href="mailto:wearestint@gmail.com" className="contact-us">
          Contact Us
        </a>
      </div>
    );
  }
}

export default Footer;
