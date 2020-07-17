import React from "react";
import "./style/profile.css";

import Menu from "./Menu.js";
import Footer from "./Footer.js";
import Button from "./Button.js";
import StudentInfo from "./StudentInfo.js";
import StudentSkills from "./StudentSkills.js";
import Select from "./Select.js";
import Autocomplete from "./Autocomplete.js";
import ReactLoading from "react-loading";

import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { SIGNUP_EVENT } from "../constants/ANALYTICS_CONSTANTS";
import { THANK_YOU_PATH } from "../constants/ROUTING_CONSTANTS";

const { setFreelancerProfile, getFreelancerRef } = require("../api/freelancer");

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      continue: false,
      major: [null, null],
      minor: [null, null],
      role: [null, null, null],
      company: [null, null, null],
      ec: [null, null, null],
      ecrole: [null, null, null],
      yearcompany: [null, null, null],
      yearec: [null, null, null],
      da: {},
      db: {},
      ccm: {},
      sd: {},
      checkbox: false,
    };
  }

  componentDidMount = async () => {
    document.title = "Create Profile | Stint";

    let freelancerRef = await getFreelancerRef(this.props.auth.uid);
    let freelancerInfo
    freelancerRef.on("value", (snapshot) => {
      this.setState({
        freelancerRef,
        freelancerInfo: snapshot.val()
      }, () => console.log("state", this.state))
    })
  };

  updateProfilePic = (imgUrl) => {
    this.state.freelancerRef.child("avatarUrl").set(imgUrl);
    document.getElementById("profile-img").src = imgUrl;
  };

  handleChange = (name, content) => {
    this.setState({
      [name]: content,
    });
  };

  toggleCheck = () => {
    this.setState({
      checkbox: !this.state.checkbox,
    });
  };

  updateChildInfo = (stateName, content, index) => {
    let cleanedState;
    let temp;
    if (index) {
      cleanedState = stateName.replace(/[^A-Za-z]+/g, "");
      temp = this.state[cleanedState];
      temp[index] = content;
    } else {
      cleanedState = stateName;
      temp = content;
    }

    this.setState(
      {
        [cleanedState]: temp,
      },
      function () {
        if (
          (this.state.year && this.state.year !== "(select year*)") &&
          this.state.colleges &&
          this.state.major[0] &&
          this.state.city &&
          this.state.state &&
          this.state.role[0] &&
          this.state.company[0] &&
          (this.state.yearcompany[0] && this.state.yearcompany[0] !== "(insert year*)") &&
          this.state.ec[0] &&
          this.state.ecrole[0] &&
          (this.state.yearec[0] && this.state.yearec[0] !== "(insert year*)")
        ) {
          this.setState({ continue: true }, () => {console.log("continue true", this.state)});
        } else {
          if (this.state.continue) {
            this.setState({ continue: false }, () => {console.log("continue true", this.state)})
          }
        }
        // else if (this.state.continue === true) {
        //   this.setState({continue: false})
        // }
      }
    );
  };

  saveAllChildren = (section, state) => {
    this.setState({
      [section]: state,
    });
  };

  submitProfile = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let temp = this.state

    if (temp.phoneYN === "No") {
      temp.phonenum = null;
    }

    let doesData = Object.keys(temp.da).length !== 0;
    let doesDesign = Object.keys(temp.db).length !== 0;
    let doesContent = Object.keys(temp.ccm).length !== 0;
    let doesSoftware = Object.keys(temp.sd).length !== 0;

    await setFreelancerProfile(
      this.props.auth.uid,

      temp.year,
      temp.colleges,
      temp.major,
      temp.minor,

      temp.city,
      temp.state,

      temp.role,
      temp.company,
      temp.yearcompany,

      temp.ecrole,
      temp.ec,
      temp.yearec,

      doesData,
      temp.da.da0,
      temp.da.da1,
      temp.da.skills,
      temp.da.awardCategories,
      temp.da.awardContent,
      temp.da.awardProviders,

      doesDesign,
      temp.db.db0,
      temp.db.skills,
      temp.db.awardCategories,
      temp.db.awardContent,
      temp.db.awardProviders,

      doesContent,
      temp.ccm.ccm0,
      temp.ccm.ccm1,
      temp.ccm.ccm2,
      temp.ccm.ccm3,
      temp.ccm.skills,
      temp.ccm.awardCategories,
      temp.ccm.awardContent,
      temp.ccm.awardProviders,

      doesSoftware,
      temp.sd.sd0,
      temp.sd.sd1,
      temp.sd.skills,
      temp.sd.awardCategories,
      temp.sd.awardContent,
      temp.sd.awardProviders,

      temp.phonenum
    );
    await this.props.analytics.logEvent(SIGNUP_EVENT);
    this.props.history.push(THANK_YOU_PATH);
  };
  render() {
    const temp = this.state;
    let doesData = Object.keys(temp.da).length !== 0;
    let doesDesign = Object.keys(temp.db).length !== 0;
    let doesContent = Object.keys(temp.ccm).length !== 0;
    let doesSoftware = Object.keys(temp.sd).length !== 0;

    let finishedApp =
      (this.state.continue && (doesData || doesDesign || doesContent || doesSoftware)) &&
      ((temp.phonenum && this.state.checkbox) ||
      (temp.phoneYN === "No" && this.state.checkbox))
        ? false
        : true;

    return (
      <div className="container">
        {this.state.freelancerRef ? (
          <>
            <Menu />

            <form
              className="padding flex-column profile-container"
              onSubmit={this.submitProfile}
              autocomplete="off"
            >
            <h1>Edit Profile</h1>
            <div className="student-dialogue">
            <div className="flex-row-comp">
              <img
                id="profile-img"
                src={require("./imgs/logo.png")}
                className="my-profile-img"
              />
            <div className="flex-column" style={{justifyContent: "center"}}>
              <h1 style={{ margin: "0" }}>
                Linda
              </h1>
              <h3 style={{margin: '0'}}>I have a different preferred name:
                <Autocomplete
                  name="preferredname"
                  placeholder="(insert preferred name*)"
                  saveData={this.handleChange}
                />
              .</h3>
            </div>
            </div>
            </div>

              <StudentInfo saveToParent={this.updateChildInfo} />

              <StudentSkills saveToParent={this.saveAllChildren} />

            <div className="student-dialogue">
              <h3 style={{ margin: "0" }}>
                <Select
                  items={["Yes", "No"]}
                  name="phoneYN"
                  saveData={this.handleChange}
                  have="true"
                />
                {this.state.phoneYN === "Yes" ? (
                  <span>, I have enabled </span>
                ) : (
                  <span>, I don't want</span>
                )}{" "}
                text updates
                {this.state.phoneYN === "Yes" ? (
                  <span>
                    {" "}
                    at{" "}
                    <Autocomplete
                      name="phonenum"
                      placeholder="(insert phone number*)"
                      saveData={this.handleChange}
                      type="number"
                    />
                    .
                  </span>
                ) : (
                  <span>.</span>
                )}
              </h3>
              <br/>
              <div className="subtitle">
              As recent college grads, we can totally relate to having
              thousands of unread emails in the inbox. By enabling text notifications,
              we hope to help you avoid those awkward missed-your-email moments.
              We’ll only text you about site activity that is important and
              relevant to you, like if an employer wants to connect.</div>
            </div>

              <div>
                <div
                  style={{ marginTop: "50px", marginBottom: "50px" }}
                  className="flex-row"
                >
                  <input
                    type="checkbox"
                    id="confirm"
                    name="confirm"
                    style={{ marginRight: "10px" }}
                    onChange={this.toggleCheck}
                  />
                  <label for="confirm" className="subtitle">
                    <b>
                      By checking this box, you ensure that all the information
                      you’ve provided is truthful and accurate to the best of
                      your knowledge.*
                    </b>{" "}
                    <br /> Our team will verify your information within the next
                    48 hours, and we’ll get back to you when your profile is all
                    set to be published!
                  </label>
                </div>

                <button
                  className="button"
                  style={{ marginBottom: "25px" }}
                  disabled={finishedApp}
                >
                  Create my profile
                </button>
                <div className="subtitle" style={{ marginBottom: "100px" }}>
                  By pressing this button, you're agreeing to our{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    style={{ color: "#474448" }}
                  >
                    <b>Privacy Policy</b>
                  </Link>
                  .
                </div>
              </div>
            </form>
            <Footer />
          </>
        ) : (
          <div className="react-loading">
            <ReactLoading
              className={"Loading"}
              type={"bubbles"}
              width={"15%"}
              height={"auto"}
              color={"#8F8DFF"}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { firebase } = props;
  return {
    analytics: firebase.analytics(),
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(ProfileEdit);
