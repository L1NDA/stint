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
import { IoLogoGithub } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import { AiFillMediumCircle, AiFillInstagram, AiFillClockCircle, AiFillDollarCircle } from "react-icons/ai";
import { getFreelancerRef } from "../api/freelancer";
import { TiSortNumericallyOutline, TiTimes, TiEquals } from "react-icons/ti";
import { getInstaInfo } from "../api/instagram";
import medium, { getMediumInfo } from "../api/medium";
import { getGithubInfo } from "../api/github";
import ReactLoading from "react-loading";
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import moment from 'moment';
import { WeekDayCalc } from 'moment-weekday-calc'

import {
  PROFILE_CREATION_PATH,
  PROFILE_EDIT_PATH,
  FOUR_OH_FOUR_PATH,
  PAYMENT_SUCCESS_PATH,
} from "../constants/ROUTING_CONSTANTS";
import {
  GITHUB_FUNCTIONS_ERROR,
  INSTAGRAM_FUNCTIONS_ERROR,
  MEDIUM_FUNCTIONS_ERROR,
} from "../constants/ANALYTICS_CONSTANTS";
import {
  INDEX_URL,
} from "../config"

const SKILLS = [
  "React",
  "Python",
  "Javascript",
  "HTML/CSS",
  "C/C++",
  "SQL",
  "Java",
];
const LEVEL = ["5", "4", "4", "4", "2", "1", "1"];
const DESIGN_SHOWCASE_PREFIX = "designshowcase-";
const PERSONAL_WEBSITE_PREFIX = "personalwebsite-";
const OTHER_FILES = "otherFiles";

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

class ProfileView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      bookCategory: null,
    };
  }

  componentDidMount() {
    document.title = `${this.state.freelancerInfo.displayName.split(" ")[0]}'s Profile – Stint`;
  }

  componentDidUpdate() {
    if (!this.state.width) {
      this.setWidth();
    }
  }

  setWidth = () => {
    const optionEle = document.getElementById(`hidden-skill-level`);
    if (optionEle) {
      const width = optionEle.offsetWidth + 5; // padding width or arrows
      this.setState({ width: `${width}px` });
    }
  };

  componentDidMount = async () => {
    let fileUrls = await this.getFilesFromStorage();

    let freelancerRef = await getFreelancerRef(this.props.match.params.uid);
    console.log("freelancerRef", freelancerRef)
    freelancerRef.on(
      "value",
      async (snapshot) => {
        let info = snapshot.val();

        console.log("freelancerinfo", info)
        if (!info) {
          this.props.history.push(FOUR_OH_FOUR_PATH);
          return;
        }

        let profile = info.profile;

        if (!profile) {
          this.props.history.push(PROFILE_CREATION_PATH);
          return;
        }

        let githubUsername = null;
        let instaUsername = null;
        let mediumUsername = null;
        if (profile.dataAnalytics) {
          if (profile.dataAnalytics.githubUser) {
            let githubUser = profile.dataAnalytics.githubUser;
            githubUsername = parseGithubUser(githubUser);
          }
        }
        if (profile.softwareDev) {
          if (profile.softwareDev.githubUser) {
            let githubUser = profile.softwareDev.githubUser;
            githubUsername = parseGithubUser(githubUser);
          }
        }
        if (profile.contentCreation) {
          if (profile.contentCreation.instagramUser) {
            let instaUser = profile.contentCreation.instagramUser;
            instaUsername = parseInstaUser(instaUser);
          }
          if (profile.contentCreation.mediumUser) {
            let mediumUser = profile.contentCreation.mediumUser;
            mediumUsername = parseMediumUser(mediumUser);
          }
        }

        let githubData = null;
        let instaData = null;
        let mediumData = null;

        if (githubUsername) {
          try {
            githubData = await getGithubInfo(githubUsername);
          } catch (err) {
            if (err.response && err.response.request.status == 401) {
              githubData = {};
            }
            await this.props.analytics.logEvent(GITHUB_FUNCTIONS_ERROR);
          }
        }

        if (mediumUsername) {
          try {
            mediumData = await getMediumInfo(mediumUsername);
          } catch (err) {
            if (err.response && err.response.request.status == 401) {
              mediumData = {};
            }
            await this.props.analytics.logEvent(MEDIUM_FUNCTIONS_ERROR);
          }
        }

        // let minLengthOrg = Math.min(info.profile.orgExperience.orgRoles.length, info.profile.orgExperience.organizations.length, info.profile.orgExperience.orgYears.length)
        // let maxLengthOrg = Math.max(info.profile.orgExperience.orgRoles.length, info.profile.orgExperience.organizations.length, info.profile.orgExperience.orgYears.length)
        // let lengthDifferenceOrg = maxLengthOrg - minLengthOrg

        // info.profile.orgExperience.orgRoles = info.profile.orgExperience.orgRoles.slice(0, lengthDifferenceOrg)
        // info.profile.orgExperience.organizations = info.profile.orgExperience.organizations.slice(0, lengthDifferenceOrg)
        // info.profile.orgExperience.orgYears = info.profile.orgExperience.orgYears.slice(0, lengthDifferenceOrg)

        // let minLengthCo = Math.min(info.profile.workExperience.companyRoles.length, info.profile.workExperience.companies.length, info.profile.workExperience.companyYears.length)
        // let maxLengthCo = Math.max(info.profile.workExperience.companyRoles.length, info.profile.workExperience.companies.length, info.profile.workExperience.companyYears.length)
        // let lengthDifferenceCo = maxLengthCo - minLengthCo

        // info.profile.workExperience.companyRoles = info.profile.workExperience.companyRoles.slice(0, lengthDifferenceCo)
        // info.profile.workExperience.companies = info.profile.workExperience.companies.slice(0, lengthDifferenceCo)
        // info.profile.workExperience.companyYears = info.profile.workExperience.companyYears.slice(0, lengthDifferenceCo)

        this.setState({
          freelancerInfo: info,
          freelancerRef,
          githubData,
          instaData,
          mediumData,
          fileUrls,
        });
      },
      function (error) {
        console.error("above error", error);
      }
    );
  };

  handleSelect = (e) => {
    if (e.target.value !== this.state.bookCategory) {
      this.setState({
        bookCategory: e.target.value
      })
    }

  }

  getFilesFromStorage = async () => {
    let storageRef = this.props.storage.ref();
    let filesRef = storageRef.child(
      "images" + "/" + this.props.match.params.uid
    );
    let res = await filesRef.listAll();

    let fileUrls = {};
    res.items.forEach(async (item) => {
      let fileData = await item.getMetadata();
      let fileUrl = await item.getDownloadURL();
      if (fileData.name.startsWith(DESIGN_SHOWCASE_PREFIX)) {
        fileUrls.designShowcase = fileUrl;
      } else if (fileData.name.startsWith(PERSONAL_WEBSITE_PREFIX)) {
        fileUrls.personalWebsite = fileUrl;
      } else {
        if (fileUrls[OTHER_FILES]) {
          fileUrls[OTHER_FILES].push(fileUrl);
        } else {
          fileUrls[OTHER_FILES] = [fileUrl];
        }
      }
    });
    return fileUrls;
  };

  handleInput = (e, stateName) => {
    if (e.target.value < 0) {
      e.target.value = ""
    }
    this.setState({
      [stateName]: e.target.value
    })
  }

  onDateChange = (startDate, endDate) => {
    if (startDate && endDate) {
      let numWeekdays = moment().weekdayCalc(startDate.toDate(), endDate.toDate(), [1,2,3,4,5])
      this.setState({
        numWeekdays: numWeekdays,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
    }
  }

  sortSkills = (skills) => {
    var items = Object.keys(skills).map(function (key) {
      return [key, skills[key]];
    });

    // Sort the array based on the second element
    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    return items;
  };

  redirectToEditProfile = () => {
    this.props.history.push(PROFILE_EDIT_PATH);
  };

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
    var personalwebsite = null;
    if (
      this.state.freelancerInfo &&
      this.state.freelancerInfo.profile.dataAnalytics &&
      this.state.freelancerInfo.profile.dataAnalytics.personalWebsiteUrl
    ) {
      personalwebsite = this.state.freelancerInfo.profile.dataAnalytics
        .personalWebsiteUrl;
    } else if (
      this.state.freelancerInfo &&
      this.state.freelancerInfo.profile.contentCreation &&
      this.state.freelancerInfo.profile.contentCreation.personalWebsiteUrl
    ) {
      personalwebsite = this.state.freelancerInfo.profile.contentCreation
        .personalWebsiteUrl;
    } else if (
      this.state.freelancerInfo &&
      this.state.freelancerInfo.profile.design &&
      this.state.freelancerInfo.profile.design.personalWebsiteUrl
    ) {
      personalwebsite = this.state.freelancerInfo.profile.design
        .personalWebsiteUrl;
    } else if (
      this.state.freelancerInfo &&
      this.state.freelancerInfo.profile.softwareDev &&
      this.state.freelancerInfo.profile.softwareDev.personalWebsiteUrl
    ) {
      personalwebsite = this.state.freelancerInfo.profile.softwareDev
        .personalWebsiteUrl;
    }

// code for edit profile button
// {this.props.auth &&
//         this.props.auth.uid === this.props.match.params.uid ? (
//           <button onClick={this.redirectToEditProfile}>edit profile</button>
//         ) : null}

    return (
      <div className="container-stint">
        <Menu />
        {this.state.freelancerInfo ? (
          <>
          {(!this.props.auth ||
           this.props.auth.uid !== this.props.match.params.uid) ?
          <div className={this.state.bookCategory ? "book-container book-container-fullscreen" : "book-container"}>
            <div className={this.state.bookCategory ? "book-container-inner add-padding" : "book-container-inner"}>
            {this.state.bookCategory
            ? <TiTimes className="modal-x" onClick={()=>this.setState({bookCategory: null, savedStart: this.state.startDate ? this.state.startDate : null, savedEnd: this.state.endDate ? this.state.endDate : null})} style={{fontSize: "30px", top: "15px", right: "15px"}}/>
            : null}
            {this.state.bookCategory
              ? <div className="pricing-container flex-column">
                <div className="flex-column">

                <RangeDatePicker
                  startDatePlaceholder="Start Date"
                  endDatePlaceholder="End Date"
                  startDate={this.state.savedStart ? moment(this.state.savedStart).format("YYYY MM DD") : null}
                  endDate={this.state.savedEnd ? moment(this.state.savedEnd).format("YYYY MM DD") : null}
                  minDate={new Date()}
                  disabled={false}
                  className="book-calendar"
                  startWeekDay="sunday"
                  onChange={(startDate, endDate) => this.onDateChange(startDate, endDate)}
                />
                <br/>
                <i className="subtitle">Please note: freelancers are only expected to work on business days. At Stint, we believe in a healthy work-life balance.</i>
                <br/>
                <div className="flex-row-comp" style={{margin: "0", width: "100%", alignItems: "center"}}>
                <div className="book-hours-container">
                  <div className="subtitle" style={{fontWeight: "bold"}}>HOURS PER DAY</div>
                  <div className="book-container-content">
                    <AiFillClockCircle/>
                    <input className="book-hours"
                      type="number"
                      placeholder="#"
                      min="0"
                      onChange={(e) => this.handleInput(e, "hours")}
                      value={this.state.hours ? this.state.hours : ""}/>
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
                          value={this.state.price ? this.state.price : ""}/>
                    / hr
                  </div>
                </div>

                </div>
                <br/>
                <i className="subtitle">We respect that startups may be in varying stages of funding and allow you to set student wages based on what your budget permits. In return, please be courteous to our students. As a benchmark, the average hourly wage for past stints is <b>$23</b>.</i>
                <br/>
                <i className="subtitle">If you ever find that you are unsatisfied with a student’s progress, we’ll fully refund you for any stint cancelled before the end of the first quarter.</i>
                </div>
                <div className="book-total">
                    <p><b>{this.state.numWeekdays && this.state.hours
                        ? <span><b>{this.state.numWeekdays * this.state.hours}</b> total</span>
                        : "Total"} hours </b> </p>
                      <div className="subtitle">({this.state.hours ? <span><b>{this.state.hours}</b> hours</span> : "Hours"} / day  x  {this.state.numWeekdays ? <span><b>{this.state.numWeekdays}</b> weekdays</span> : "Number of weekdays"})</div>
                      <br/>
                      <p><b><TiTimes style={{position: "absolute", left: "0"}}/> {this.state.price
                        ? `$ ${this.state.price}`
                        : "Price"} / hour </b></p>
                      <br/>
                      <p style={{borderTop: "1px solid lightgray", paddingTop: "20px"}}><b><TiEquals style={{position: "absolute", left: "0"}}/> {this.state.hours && this.state.numWeekdays && this.state.price ? `$ ${this.state.hours * this.state.numWeekdays * this.state.price} total` : "Total price"}</b></p></div>

              </div>
              : null}

            <div className={this.state.bookCategory ? "flex-column half-container-book" : null}>
              <div className={this.state.bookCategory ? "book-title-opened" : "flex-row book-title"}>
                <img
                  src={this.state.freelancerInfo.avatarUrl}
                ></img>
                <p>Book {this.state.freelancerInfo.displayName.split(" ")[0]} for {" "}
                  {this.state.bookCategory ?
                    <b>{this.state.bookCategory}</b> :
                    <select
                      name="booking-category"
                      className="booking-category-select"
                      onChange={this.handleSelect}>
                      <option value="">(insert task)</option>
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
                  }
                  </p>

              </div>

            <div className="flex-column" style={{marginTop: "30px"}}>
            <p style={{color: "white"}}><b>PROJECT OVERVIEW</b></p>
            <textarea
              className="book-textarea"
              maxlength={499}
              placeholder={`Give ${this.state.freelancerInfo.displayName.split(" ")[0]} a brief description of what your stint entails. No need to explain every little detail, but give enough that s/he has a basic understanding of the requirements. (Max 500 char.)`}
              onChange={(e) => this.setState({ stintDescription: e.target.value })}></textarea>

            </div>
            <div className="flex-column button-container">
              <CheckoutButton
                freelancerUid={this.props.match.params.uid}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                freelancerName={this.state.freelancerInfo.displayName.split(" ")[0]}
                totalDays={this.state.numWeekdays}
                freelancerPhotoUrl={this.state.freelancerInfo.avatarUrl}
                stintCategory={this.state.bookCategory}
                stintDescription={this.state.stintDescription}
                redirectOnSuccessUrl={INDEX_URL + PAYMENT_SUCCESS_PATH}
                redirectOnFailUrl="https://wearestint.com/our-mission"
                totalHours={this.state.hours * this.state.numWeekdays}
                hourlyRate={this.state.price}
                totalAmount={this.state.hours * this.state.numWeekdays * this.state.price * 100}
                disabled={this.state.startDate
                  && this.state.endDate
                  && this.state.numWeekdays
                  && this.state.bookCategory
                  && this.state.hours
                  && this.state.price ? false : true}/>
                <div className="subtitle" style={{color: "white", marginTop: "15px", textAlign: "right"}}>By checking out, you are agreeing to our{" "}
              <Link to="/privacy-policy" style={{color: "white", fontWeight: "bold"}}>Privacy Policy</Link>.</div>

            </div>

          </div>

          </div>

        </div> : null}


            <section className="padding flex-row profile-item">
              <img
                id="profile-img"
                src={this.state.freelancerInfo.avatarUrl}
                className="my-profile-img"
              ></img>
              <div>
                <h1 style={{ margin: "0" }}>
                  {this.state.freelancerInfo.displayName.split(" ")[0]}
                </h1>
                <div style={{ margin: "0" }}>
                  {this.state.freelancerInfo.profile.education.majors[0]}
                  {this.state.freelancerInfo.profile.education.majors[1]
                    ? ` & ` +
                      this.state.freelancerInfo.profile.education.majors[1]
                    : null}
                  {this.state.freelancerInfo.profile.education.minors
                    ? ` / ` +
                      this.state.freelancerInfo.profile.education.minors[0] +
                      ` (minor)`
                    : null}
                  {this.state.freelancerInfo.profile.education.minors &&
                  this.state.freelancerInfo.profile.education.minors[1]
                    ? ` & ` +
                      this.state.freelancerInfo.profile.education.minors[1] +
                      ` (minor)`
                    : null}
                </div>
                <div style={{ margin: "0" }}>
                  {this.state.freelancerInfo.profile.education.year
                    .charAt(0)
                    .toUpperCase() +
                    this.state.freelancerInfo.profile.education.year.slice(
                      1
                    )}{" "}
                  @ {this.state.freelancerInfo.profile.education.school}
                </div>
              </div>
            </section>

            <section className="profile-item flex-row padding experience-section">
              <div className="experience">
                <h2>Work Experience</h2>
                <div className="experience-container">
                  <div className="experience-line"></div>
                  {this.state.freelancerInfo.profile.workExperience.companies.map(
                    (company, index) => {
                      return (
                        <div className="experience-item">
                          <div className="experience-label">
                            ‘
                            {this.state.freelancerInfo.profile.workExperience.companyYears[
                              index
                            ].slice(2)}
                          </div>
                          {
                            this.state.freelancerInfo.profile.workExperience
                              .companyRoles[index]
                          }{" "}
                          @ <b> {company}</b>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="experience">
                <h2 style={{ color: "#05D9B2" }}>Other Experience</h2>
                <div className="experience-container">
                  <div
                    className="experience-line"
                    style={{ backgroundColor: "#05D9B2" }}
                  ></div>
                  {this.state.freelancerInfo.profile.orgExperience.organizations.map(
                    (organization, index) => {
                      return (
                        <div className="experience-item">
                          <div
                            className="experience-label"
                            style={{ backgroundColor: "#05D9B2" }}
                          >
                            ‘
                            {this.state.freelancerInfo.profile.orgExperience.orgYears[
                              index
                            ].slice(2)}
                          </div>
                          {
                            this.state.freelancerInfo.profile.orgExperience
                              .orgRoles[index]
                          }{" "}
                          @ <b> {organization}</b>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </section>

            {personalwebsite && personalwebsite.startsWith("https://") ? (
              <section className="profile-item">
                <h2 style={{ color: "#474448" }}>My Personal Website</h2>
                <a
                  className="personal-website"
                  href={personalwebsite}
                  target="_blank"
                >
                  <img
                    src={require("./imgs/macbook.png")}
                    className="works-laptop"
                  ></img>
                  <iframe
                    src={personalwebsite}
                    className="works-laptop-screen"
                  ></iframe>
                </a>
              </section>
            ) : personalwebsite ? (
              <section className="profile-item">
                <h2 style={{ color: "#474448" }}>My Personal Website</h2>
                <a
                  className="personal-website"
                  href={personalwebsite}
                  target="_blank"
                >
                  <img
                    src={require("./imgs/macbook.png")}
                    className="works-laptop"
                  ></img>
                  <div
                    className="works-laptop-screen flex-column center"
                    style={{ backgroundColor: "#474448" }}
                  >
                    <h1 style={{ color: "white" }}>
                      {personalwebsite.endsWith("/")
                        ? personalwebsite.replace("http://", "").slice(0, -1)
                        : personalwebsite.replace("http://", "")}
                    </h1>
                    <div className="subtitle" style={{ color: "white" }}>
                      This website cannot be previewed as it either does not use
                      https or does not allow cross-origin previews. Please
                      click to view.
                    </div>
                  </div>
                </a>
              </section>
            ) : null}

            {this.state.freelancerInfo.profile.dataAnalytics ? (
              <section className="profile-item">
                <h1>Analytics</h1>
                {this.state.freelancerInfo.profile.dataAnalytics.skills ? (
                  <div className="profile-skills">
                    <div className="section-header">
                      My skill(s) and proficiency
                    </div>
                    <div className="skill-container">
                      {this.sortSkills(
                        this.state.freelancerInfo.profile.dataAnalytics.skills
                      ).map((skillTuple, index) => {
                        return (
                          <div
                            className="skill-static"
                            style={{ minWidth: this.state.width }}
                          >
                            <span className="skill-name-static">
                              {skillTuple[0]}: {skillTuple[1]}
                            </span>
                            <div
                              className="skill-bar"
                              style={{ width: `${skillTuple[1] * 20}%` }}
                            ></div>
                            <div
                              className="skill-static"
                              id="hidden-skill-level"
                            >
                              Skill Level
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {this.state.freelancerInfo.profile.dataAnalytics &&
                this.state.githubData ? (
                  <div className="profile-works">
                    <div className="section-header">My work(s)</div>
                    <div className="works-container">
                      {this.state.githubData ? (
                        <a
                          className="works-item"
                          href={`https://github.com/${this.state.freelancerInfo.profile.dataAnalytics.githubUser.slice(
                            1
                          )}`}
                          target="_blank"
                        >
                          <div className="works-header github">
                            <IoLogoGithub className="works-header-img" />
                            Github
                          </div>

                          {this.state.githubData.data &&
                          this.state.githubData.data.repoNames.length !== 0 ? (
                            <div className="works-section">
                              <div className="works-section-header">
                                - My recent repositories
                              </div>
                              {this.state.githubData.data.repoNames.map(
                                (repoArray, index) => {
                                  return (
                                    <a
                                      className="works-section-item works-section-item-link flex-column"
                                      href={repoArray[2]}
                                      target="_blank"
                                    >
                                      <b>{repoArray[0]}</b>
                                      {repoArray[1]}
                                    </a>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div className="works-section">
                              <div className="works-section-header">
                                (No public repositories.)
                              </div>
                            </div>
                          )}

                          {this.state.githubData.data.eventCount ? (
                            <div className="works-section">
                              <div className="works-section-header">
                                - Number of contributions
                              </div>
                              <div className="works-section-item">
                                <b>{this.state.githubData.data.eventCount}</b>{" "}
                                in the last year (average{" "}
                                <b>
                                  {Math.round(
                                    this.state.githubData.data.eventCount / 12
                                  )}
                                </b>{" "}
                                per month)
                              </div>
                              <div
                                className="subtitle works-section-item"
                                style={{ color: "#b0b0b0" }}
                              >
                                The max contributions logged by Github is 30.
                              </div>
                            </div>
                          ) : (
                            <div className="works-section">
                              <div className="works-section-header">
                                (No contributions this past year.)
                              </div>
                            </div>
                          )}

                          {this.state.githubData.data.orgs.length !== 0 ? (
                            <div className="works-section">
                              <div className="works-section-header">
                                - My organizations
                              </div>
                              {this.state.githubData.data.orgs.map(
                                (orgArray, index) => {
                                  return (
                                    <a
                                      className="works-section-item works-section-item-link flex-column"
                                      href={orgArray[2]}
                                      target="_blank"
                                    >
                                      <b>{orgArray[0]}</b>
                                      {orgArray[1]}
                                    </a>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div className="works-section">
                              <div className="works-section-header">
                                (No public organizations to show.)
                              </div>
                            </div>
                          )}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {this.state.freelancerInfo.profile.dataAnalytics
                  .awardCategories ? (
                  <div className="profile-awards">
                    <div className="section-header">My awards</div>
                    {this.state.freelancerInfo.profile.dataAnalytics.awardCategories.map(
                      (awardCategory, index) => {
                        return (
                          <h3>
                            <b>
                              {
                                this.state.freelancerInfo.profile.dataAnalytics
                                  .awardContent[index]
                              }{" "}
                            </b>
                            (
                            {awardCategory === "competition"
                              ? `a competition`
                              : awardCategory === "academic"
                              ? "an academic"
                              : `an`}{" "}
                            award from{" "}
                            {
                              this.state.freelancerInfo.profile.dataAnalytics
                                .awardProviders[index]
                            }
                            )
                          </h3>
                        );
                      }
                    )}
                  </div>
                ) : null}
              </section>
            ) : null}

            {this.state.freelancerInfo.profile.contentCreation ? (
              <section className="profile-item">
                <h1>Content Creation & Management</h1>
                {this.state.freelancerInfo.profile.contentCreation.skills ? (
                  <div className="profile-skills">
                    <div className="section-header">
                      My skill(s) and proficiency
                    </div>
                    <div className="skill-container">
                      {this.sortSkills(
                        this.state.freelancerInfo.profile.contentCreation.skills
                      ).map((skillTuple, index) => {
                        return (
                          <div
                            className="skill-static"
                            style={{ minWidth: this.state.width }}
                          >
                            <span className="skill-name-static">
                              {skillTuple[0]}: {skillTuple[1]}
                            </span>
                            <div
                              className="skill-bar"
                              style={{ width: `${skillTuple[1] * 20}%` }}
                            ></div>
                            <div
                              className="skill-static"
                              id="hidden-skill-level"
                            >
                              Skill Level
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {(this.state.mediumData &&
                  this.state.mediumData.data.publications.length !== 0) ||
                this.state.freelancerInfo.profile.contentCreation
                  .instagramUser ? (
                  <div className="profile-works">
                    <div className="section-header">My work(s)</div>
                    <div className="works-container">
                      {this.state.mediumData &&
                      this.state.mediumData.data.publications.length !== 0 ? (
                        <a
                          className="works-item"
                          href={`https://medium.com/${this.state.freelancerInfo.profile.contentCreation.mediumUser}`}
                        >
                          <div className="works-header medium">
                            <AiFillMediumCircle className="works-header-img" />
                            Medium
                          </div>

                          <div className="works-section">
                            <div className="works-section-header">
                              - My recent publications
                            </div>
                            {this.state.mediumData.data.publications.map(
                              (pubArray, index) => {
                                return (
                                  <a
                                    className="works-section-item works-section-item-link flex-column"
                                    href={pubArray.link}
                                    target="_blank"
                                  >
                                    <div
                                      style={{
                                        backgroundImage: `url(${pubArray.thumbnail})`,
                                      }}
                                      className="medium-img"
                                    ></div>
                                    <b>{pubArray.title}</b>
                                    <i>
                                      Published on{" "}
                                      {pubArray.pubDate.split(" ")[0]}
                                    </i>
                                    <div
                                      style={{
                                        color: "#878787",
                                        marginTop: "10px",
                                      }}
                                    >
                                      {pubArray.description}
                                    </div>
                                    <br />
                                  </a>
                                );
                              }
                            )}
                          </div>
                        </a>
                      ) : null}

                      {this.state.freelancerInfo.profile.contentCreation
                        .instagramUser ? (
                        <a
                          className="works-item"
                          href={`https://www.instagram.com/${this.state.freelancerInfo.profile.contentCreation.instagramUser.slice(
                            1
                          )}`}
                        >
                          <div className="works-header instagram">
                            <AiFillInstagram className="works-header-img" />
                            Instagram
                          </div>

                          <div className="works-section flex-column center">
                            <img
                              src={require("./imgs/instagram-logo.png")}
                              className="insta-logo"
                            />
                            <div className="works-header instagram">
                              {
                                this.state.freelancerInfo.profile
                                  .contentCreation.instagramUser
                              }
                            </div>
                          </div>
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {this.state.freelancerInfo.profile.contentCreation
                  .awardCategories ? (
                  <div className="profile-awards">
                    <div className="section-header">My awards</div>
                    {this.state.freelancerInfo.profile.contentCreation.awardCategories.map(
                      (awardCategory, index) => {
                        return (
                          <h3>
                            <b>
                              {
                                this.state.freelancerInfo.profile
                                  .contentCreation.awardContent[index]
                              }{" "}
                            </b>
                            (
                            {awardCategory === "competition"
                              ? `a competition`
                              : awardCategory === "academic"
                              ? "an academic"
                              : `an`}{" "}
                            award from{" "}
                            {
                              this.state.freelancerInfo.profile.contentCreation
                                .awardProviders[index]
                            }
                            )
                          </h3>
                        );
                      }
                    )}
                  </div>
                ) : null}
              </section>
            ) : null}

            {this.state.freelancerInfo.profile.design ? (
              <section className="profile-item">
                <h1>Design and Branding</h1>
                {this.state.freelancerInfo.profile.design.skills ? (
                  <div className="profile-skills">
                    <div className="section-header">
                      My skill(s) and proficiency
                    </div>
                    <div className="skill-container">
                      {this.sortSkills(
                        this.state.freelancerInfo.profile.design.skills
                      ).map((skillTuple, index) => {
                        return (
                          <div
                            className="skill-static"
                            style={{ minWidth: this.state.width }}
                          >
                            <span className="skill-name-static">
                              {skillTuple[0]}: {skillTuple[1]}
                            </span>
                            <div
                              className="skill-bar"
                              style={{ width: `${skillTuple[1] * 20}%` }}
                            ></div>
                            <div
                              className="skill-static"
                              id="hidden-skill-level"
                            >
                              Skill Level
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {this.state.fileUrls.designShowcase ? (
                  <div className="profile-works">
                    <div className="section-header">My work(s)</div>
                    <div className="works-container">
                      {this.state.fileUrls.designShowcase ? (
                        <a
                          className="works-item"
                          href={this.state.fileUrls.designShowcase}
                          target="_blank"
                        >
                          <div className="works-header gray">
                            <FiLink className="works-header-img" />
                            Sample work
                          </div>
                          <div className="works-section flex-column center">
                            <iframe
                              src={
                                this.state.fileUrls.designShowcase +
                                `#toolbar=0&navpanes=0&statusbar=0&messages=0`
                              }
                              className="work-iframe"
                            ></iframe>
                          </div>
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {this.state.freelancerInfo.profile.design.awardCategories ? (
                  <div className="profile-awards">
                    <div className="section-header">My awards</div>
                    {this.state.freelancerInfo.profile.design.awardCategories.map(
                      (awardCategory, index) => {
                        return (
                          <h3>
                            <b>
                              {
                                this.state.freelancerInfo.profile.design
                                  .awardContent[index]
                              }{" "}
                            </b>
                            (
                            {awardCategory === "competition"
                              ? `a competition`
                              : awardCategory === "academic"
                              ? "an academic"
                              : `an`}{" "}
                            award from{" "}
                            {
                              this.state.freelancerInfo.profile.design
                                .awardProviders[index]
                            }
                            )
                          </h3>
                        );
                      }
                    )}
                  </div>
                ) : null}
              </section>
            ) : null}

            {this.state.freelancerInfo.profile.softwareDev ? (
              <section className="profile-item">
                <h1>Software Development</h1>
                {this.state.freelancerInfo.profile.softwareDev.skills ? (
                  <div className="profile-skills">
                    <div className="section-header">
                      My skill(s) and proficiency
                    </div>
                    <div className="skill-container">
                      {this.sortSkills(
                        this.state.freelancerInfo.profile.softwareDev.skills
                      ).map((skillTuple, index) => {
                        return (
                          <div
                            className="skill-static"
                            style={{ minWidth: this.state.width }}
                          >
                            <span className="skill-name-static">
                              {skillTuple[0]}: {skillTuple[1]}
                            </span>
                            <div
                              className="skill-bar"
                              style={{ width: `${skillTuple[1] * 20}%` }}
                            ></div>
                            <div
                              className="skill-static"
                              id="hidden-skill-level"
                            >
                              Skill Level
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {this.state.freelancerInfo.profile.softwareDev &&
                this.state.githubData ? (
                  <div className="profile-works">
                    <div className="section-header">My work(s)</div>
                    <div className="works-container">
                      {this.state.githubData ? (
                        <a
                          className="works-item"
                          href={`https://github.com/${this.state.freelancerInfo.profile.softwareDev.githubUser.slice(
                            1
                          )}`}
                          target="_blank"
                        >
                          <div className="works-header github">
                            <IoLogoGithub className="works-header-img" />
                            Github
                          </div>

                          {this.state.githubData.data.repoNames.length !== 0 ? (
                            <div className="works-section">
                              <div className="works-section-header">
                                - My recent repositories
                              </div>
                              {this.state.githubData.data.repoNames.map(
                                (repoArray, index) => {
                                  return (
                                    <a
                                      className="works-section-item works-section-item-link flex-column"
                                      href={repoArray[2]}
                                      target="_blank"
                                    >
                                      <b>{repoArray[0]}</b>
                                      {repoArray[1]}
                                    </a>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div className="works-section">
                              <div className="works-section-header">
                                (No public repositories.)
                              </div>
                            </div>
                          )}

                          {this.state.githubData.data.eventCount ? (
                            <div className="works-section">
                              <div className="works-section-header">
                                - Number of contributions
                              </div>
                              <div className="works-section-item">
                                <b>{this.state.githubData.data.eventCount}</b>{" "}
                                in the last year (average{" "}
                                <b>
                                  {Math.round(
                                    this.state.githubData.data.eventCount / 12
                                  )}
                                </b>{" "}
                                per month)
                              </div>
                              <div
                                className="subtitle works-section-item"
                                style={{ color: "#b0b0b0" }}
                              >
                                The max contributions logged by Github is 30.
                              </div>
                            </div>
                          ) : (
                            <div className="works-section">
                              <div className="works-section-header">
                                (No contributions this past year.)
                              </div>
                            </div>
                          )}

                          {this.state.githubData.data.orgs.length !== 0 ? (
                            <div className="works-section">
                              <div className="works-section-header">
                                - My organizations
                              </div>
                              {this.state.githubData.data.orgs.map(
                                (orgArray, index) => {
                                  return (
                                    <a
                                      className="works-section-item works-section-item-link flex-column"
                                      href={orgArray[2]}
                                      target="_blank"
                                    >
                                      <b>{orgArray[0]}</b>
                                      {orgArray[1]}
                                    </a>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div className="works-section">
                              <div className="works-section-header">
                                (No public organizations to show.)
                              </div>
                            </div>
                          )}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {this.state.freelancerInfo.profile.softwareDev
                  .awardCategories ? (
                  <div className="profile-awards">
                    <div className="section-header">My awards</div>
                    {this.state.freelancerInfo.profile.softwareDev.awardCategories.map(
                      (awardCategory, index) => {
                        return (
                          <h3>
                            <b>
                              {
                                this.state.freelancerInfo.profile.softwareDev
                                  .awardContent[index]
                              }{" "}
                            </b>
                            (
                            {awardCategory === "competition"
                              ? `a competition`
                              : awardCategory === "academic"
                              ? "an academic"
                              : `an`}{" "}
                            award from{" "}
                            {
                              this.state.freelancerInfo.profile.softwareDev
                                .awardProviders[index]
                            }
                            )
                          </h3>
                        );
                      }
                    )}
                  </div>
                ) : null}
              </section>
            ) : null}

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

// <section className="self-view">
//   <h2 style={{marginTop: '0', color: 'white'}}>(Visible to you only)</h2>
//   <div className="flex-column">
//     {this.state.freelancerInfo.profile.dataAnalytics ?
//       <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>analytics</b> stints.</div> : null}
//
//     {this.state.freelancerInfo.profile.contentCreation ? <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>content creation & management</b> stints.</div> : null}
//
//     {this.state.freelancerInfo.profile.design ? <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>design & branding</b> stints.</div> : null}
//
//     {this.state.freelancerInfo.profile.softwareDev ? <div style={{color: 'white', margin: '5px 0'}}>I am currently <b style={{color: '#8F8DFF'}}>available</b> for <b>software engineering</b> stints.</div> : null}
//
//   </div>
//   <div className="subtitle" style={{color: 'white', marginTop: '30px'}}>(If you set yourself as ‘not available’ for a category, you will not show up in relevant search results for that area.)</div>
// </section>

function parseGithubUser(user) {
  return user.substring(1);
}

function parseMediumUser(user) {
  return user.substring(1);
}

function parseInstaUser(user) {
  return user.substring(1);
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
)(ProfileView);
