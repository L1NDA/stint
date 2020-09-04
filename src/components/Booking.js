import React from "react";
import Menu from "./Menu.js";
import Footer from "./Footer.js";
import CheckoutButton from "./Payment/CheckoutButton.js";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import "./style/my-profile.css";
import { TiTimes, TiEquals, TiArrowRight } from "react-icons/ti";
import { AiFillClockCircle, AiFillDollarCircle } from "react-icons/ai";

import { getFreelancerRef } from "../api/freelancer";

import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import moment from 'moment';
import { WeekDayCalc } from 'moment-weekday-calc'

import {
  FOUR_OH_FOUR_PATH,
  PAYMENT_SUCCESS_PATH,
} from "../constants/ROUTING_CONSTANTS";

import {
  INDEX_URL,
} from "../config"

const STINT_CATEGORIES = {
  da: [
    "Data Entry",
    "Data Visualization",
    "Data Research & Analysis",
    "Data Collection",
    "Database Maintenance",
    "Data Cleaning & Pipelining",
    "Machine Learning",
    "Other (Analytics)",
  ],
  ccm: [
    "Blog Writing",
    "Social Media Management",
    "Digital Marketing",
    "Listserv Management",
    "Newsletter Creation",
    "Video Creation & Editing",
    "Photography & Editing",
    "Voice-over",
    "Music Recording",
    "Language Translation",
    "Other (Content Creation & Management)"
  ],
  db: [
    "Design & Branding",
    "Logo (Re)design",
    "Website (Re)design",
    "App (Re)design",
    "Flyer & Print Design",
    "Digital Illustration",
    "Physical Illustration",
    "UX Research",
    "User Profiles & Journey Maps",
    "Other (Design)"
  ],
  sd: [
    "Web Development",
    "Mobile Development",
    "Native Development",
    "MVPs & Landing Pages",
    "QA Testing",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Other"
  ]
}

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state
  }

  componentDidMount() {
    document.title = `Book ${this.state.freelancerName} – Stint`;
  }

  handleInput = (e, stateName) => {
    if (e.target.value < 0) {
      e.target.value = ""
    }
    this.setState({
      [stateName]: e.target.value
    })
  }

  handleSelect = (e) => {
    if (e.target.value !== this.state.bookCategory) {
      this.setState({
        bookCategory: e.target.value
      })
    }

  }



  /* For Linda's edit profile button:
  Use the following conditional to check whether to display the edit profile button or display a null:

  this.props.auth && this.props.auth.uid === this.props.match.params.uid ?
    <display edit profile redirect button> :
    null or whatever u wanna display instead

  Notes:
<<<<<<< HEAD
  this.props.auth loads asynchronously, so there may be a delay on initial load where null is displayed -
=======
  this.props.auth loads asynchronously, so there may be a delay on initial load where null is displayed -
>>>>>>> develop
  (because this.props.auth is null at first)
*/

  render() {


    return (
      <div className="container flex-column" style={{minHeight: "100vh"}}>
        <Menu />
          <div className="book-container" style={{flexGrow: "1"}}>

            <div className="flex-column half-container-book">
            <div className="flex-column">

              <div className="flex-row center">
                <div className="flex-row center" style={{marginRight: "10px"}}>
                  <div className={this.state.page2 ? "book-count" : "book-count-active book-count"}>1</div>
                  Pricing
                </div>
                <TiArrowRight/>
                <div className="flex-row center" style={{marginLeft: "10px"}}>
                  <div className={this.state.page2 ? "book-count-active book-count" : "book-count"}>2</div>
                  Details
                </div>

              </div>

              {this.state.page2
                ? <form className="half-container-book-content">
                <div className="booking-category-select-container">
                <div className="subtitle" style={{fontWeight: "bold"}}>BOOKING CATEGORY</div>
                <select
                  name="booking-category"
                  required
                  className="booking-category-select"
                  onChange={this.handleSelect}>
                  <option value="">(select task)</option>
                  {this.state.freelancerInfo.profile.dataAnalytics ?
                    <optgroup label="Analytics">
                      {STINT_CATEGORIES.da.map(
                        (category) => {
                          return (
                            <option value={category}>{category}</option>
                          )})}
                    </optgroup>
                    : null
                  }
                  {this.state.freelancerInfo.profile.contentCreation ?
                    <optgroup label="Content Creation">
                      {STINT_CATEGORIES.ccm.map(
                        (category) => {
                          return (
                            <option value={category}>{category}</option>
                          )})}
                    </optgroup>
                    : null
                  }
                  {this.state.freelancerInfo.profile.design ?
                    <optgroup label="Design">
                      {STINT_CATEGORIES.db.map(
                        (category) => {
                          return (
                            <option value={category}>{category}</option>
                          )})}
                    </optgroup>
                    : null
                  }
                  {this.state.freelancerInfo.profile.softwareDev ?
                    <optgroup label="Software Development">
                      {STINT_CATEGORIES.sd.map(
                        (category) => {
                          return (
                            <option value={category}>{category}</option>
                          )})}
                    </optgroup>
                    : null
                  }

                </select>
                </div>

              <div className="booking-category-textarea-container">
              <div className="subtitle" style={{fontWeight: "bold"}}>STINT DESCRIPTION</div>
              <textarea
                className="book-textarea"
                maxlength={499}
                required
                placeholder={`Give ${this.state.freelancerName} a brief description of what your stint entails. No need to explain every little detail, but give enough that s/he has a basic understanding of the requirements. (Max 500 char.)`}
                onChange={(e) => this.setState({ stintDescription: e.target.value })}></textarea>
              </div>

              <div className="subtitle" style={{color: "#474448", marginTop: "75px"}}>By clicking this button below, you are agreeing to our{" "}


              <Link to="/privacy-policy" style={{color: "#474448", fontWeight: "bold"}} target="_blank">Privacy Policy</Link>.</div>

              <button className="button">Send request</button>

              </form>


                : <form className="half-container-book-content" onSubmit={(e) => {e.preventDefault(); this.setState({page2: true})}}>

                <div className="flex-row-comp" style={{margin: "0", width: "100%", alignItems: "center"}}>
                <div className="book-hours-container">
                  <div className="subtitle" style={{fontWeight: "bold"}}>(AVG) HOURS PER DAY</div>
                  <div className="book-container-content">
                    <AiFillClockCircle/>
                    <input className="book-hours"
                      type="number"
                      placeholder="#"
                      min="0"
                      onChange={(e) => this.handleInput(e, "hours")}
                      value={this.state.hours ? this.state.hours : ""}
                      required/>
                    hrs / day
                  </div>
                </div>
                <div className="input-line"></div>
                <div className="book-price-container">
                  <div className="subtitle" style={{fontWeight: "bold"}}>HOURLY WAGE</div>
                  <div className="book-container-content">
                      <AiFillDollarCircle/>
                        <input className="book-price"
                          type="number"
                          placeholder="Price"
                          min="0"
                          onChange={(e) => this.handleInput(e, "price")}
                          value={this.state.price ? this.state.price : ""}
                          required/>
                    / hr
                  </div>
                </div>

                </div>

                <div style={{margin: "40px 0 15px 0", fontStyle: "italic", fontWeight: "bold", color: "#474448"}}>First time booking on Stint? Learn about our process <Link to="/booking-process" style={{textDecoration: "underline"}} className="link" target="_blank">here</Link>.</div>
                <i className="subtitle">We respect that startups may be in varying stages of funding and allow you to set student wages based on what your budget permits. In return, please be courteous to our students. As a benchmark, the average hourly wage for past stints is <b>$23</b>.</i>
                <br/><br/>
                <i className="subtitle">If you ever find that you are unsatisfied with a student’s progress, we’ll fully refund you for any stint cancelled before the end of the first quarter.</i>

                <button className="button"
                  style={{marginTop: "75px"}}>Continue to details</button>

              </form>

              }






            </div>

          </div>

          <div className="pricing-container flex-column">
          <div className="flex-column">

            <div className="flex-row" style={{alignItems: "center"}}>
              <img className="book-avatar" src={this.state.avatarUrl}></img>
              <p>Book {this.state.freelancerName}</p>
              {this.state.bookCategory ? `for ${this.state.bookCategory}` : null}
            </div>



          <br/>

          <br/>

          <br/>
          </div>
          <div className="book-total">
              <p><b>{this.state.numWeekdays && this.state.hours
                  ? <span><b style={{color: "#8F8DFF"}}>{this.state.numWeekdays * this.state.hours}</b> total</span>
                  : "Total"} hours </b> </p>
                <div className="subtitle">({this.state.hours ? <span><b>{this.state.hours}</b> hours</span> : "Hours"} / day  x  {this.state.numWeekdays ? <span><b>{this.state.numWeekdays}</b> weekdays</span> : "Number of weekdays"})</div>
                <br/>
                <p><b><TiTimes style={{position: "absolute", left: "0"}}/> {this.state.price
                  ? <b style={{color: "#8F8DFF"}}>$ {this.state.price}</b>
                  : "Price"} / hour </b></p>
                <br/>
                <p style={{borderTop: "1px solid lightgray", paddingTop: "20px"}}><b><TiEquals style={{position: "absolute", left: "0"}}/> {this.state.hours && this.state.numWeekdays && this.state.price ? <b><span style={{color: "#8F8DFF"}}>$ {this.state.hours * this.state.numWeekdays * this.state.price}</span> total</b> : "Total price"}</b></p></div>

        </div>

        </div>


        <Footer />

      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const { firebase } = props;

  return {
    storage: firebase.storage(),
    analytics: firebase.analytics(),
    auth: state.firebase.auth,
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(Booking);
