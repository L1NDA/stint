import React from "react";
import "./style/homepage.css";
import Menu from "./Menu.js";
import Footer from "./Footer.js";
import { NavLink, Link } from "react-router-dom";

class BookingProcess extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="container flex-column" style={{height: "100vh"}}>
        <Menu />

          <div className="process-container flex-column center">
            <h1 style={{ textAlign: "center" }}>Booking a Student Freelancer</h1>
            <div className="process">
              <div className="process-line"></div>
              <div className="process-item">
                <div className="process-label">1</div>
                <div className="process-img-container">
                <img
                  src={require("./imgs/booking-1.jpeg")}
                  className="process-img"
                />
                </div>
                <div className="process-text">
                  <h2>Reserve a Student</h2>
                  <p>
                    On a student profile listing, book the student freelancer by <b>selecting your specific task from the dropdown menu</b>.
                  </p>
                </div>
              </div>
              <div className="process-item">
                <div className="process-label">2</div>
                <div className="process-img-container">
                  <img
                    src={require("./imgs/booking-2.jpeg")}
                    className="process-img"
                  />
                </div>

                <div className="process-text">
                  <h2>Structure Your Stint</h2>
                  <p>
                    Set your project details (<b>Start Date</b>, <b>End Date</b>, <b>Hours per Day</b>, <b>Hourly Wage</b>) and write a short <b>Project Overview</b> (max 500 char.) for your Stint. When you’re ready, click <b>Reserve now</b>.
                  </p>
                </div>
              </div>

              <div className="process-item">
                <div className="process-label">3</div>
                <div className="process-img-container">
                <img
                  src={require("./imgs/booking-4.jpeg")}
                  className="process-img"
                /></div>
                <div className="process-text">
                  <h2>Receive Student Confirmation</h2>
                  <p>
                    Once you submit the stint request, the student will receive a notification with your proposed terms and description for the Stint – <b>they can accept or deny the request.</b>
                  </p>
                  <div className="subtitle" style={{marginTop: "10px"}}>
                    To encourage fair compensation, students also have the ability to negotiate for a higher pay (up to 1 time), if they wish. We’ll notify you if this is the case.
                  </div>
                </div>
              </div>

              <div className="process-item">
                <div className="process-label">4</div>
                <div className="process-img-container">
                <img
                  src={require("./imgs/booking-3.jpeg")}
                  className="process-img"
                /></div>
                <div className="process-text">
                  <h2>Submit Your Payment</h2>
                  <p>
                    Congrats! The student has accepted your terms for the Stint. You will receive a link to our payment page. We’ll receive your payment immediately and hold onto it, and will pay the student on our end as the stint rolls out.
                  </p>
                  <div className="subtitle" style={{marginTop: "10px"}}>
                    You can cancel any time before the first quarter ends with a full refund if you’re unsatisfied in any way. After the first quarter, the student will start receiving their pay at the agreed hourly wage (including wages earned in the first quarter). If you decide to cancel the Stint after the first quarter, you’ll receive back all wages that have not been paid out yet, less transaction fees.
                  </div>
                </div>
              </div>



            </div>

            <p>Still confused? See our <Link to="/privacy-policy" className="url" style={{display: "inline-flex", color: "#474448"}}>Privacy Policy</Link> for more information or reach out to us at <a href="mailto:wearestint@gmail.com" className="url" style={{display: "inline-flex", color: "#474448"}}>wearestint@gmail.com.</a></p>
          </div>


        <Footer />
      </div>
    );
  }
}

export default BookingProcess;
