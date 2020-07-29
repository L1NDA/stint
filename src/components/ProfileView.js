import React from "react";
import Menu from "./Menu.js";
import Footer from "./Footer.js";
import CheckoutButton from "./Payment/CheckoutButton.js";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
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

import { PROFILE_CREATION_PATH } from "../constants/ROUTING_CONSTANTS";
import {
  GITHUB_FUNCTIONS_ERROR,
  INSTAGRAM_FUNCTIONS_ERROR,
  MEDIUM_FUNCTIONS_ERROR,
} from "../constants/ANALYTICS_CONSTANTS";

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
    console.log("param uid", props.match.params.uid);
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

  updateProfilePic = (imgUrl) => {
    this.state.freelancerRef.child("avatarUrl").set(imgUrl);
    document.getElementById("profile-img").src = imgUrl;
  };

  componentDidMount = async () => {
    let fileUrls = await this.getFilesFromStorage();

    let freelancerRef = await getFreelancerRef(this.props.match.params.uid);
    freelancerRef.on(
      "value",
      async (snapshot) => {
        let info = snapshot.val();
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
    console.log("onDateChange Called")
    if (startDate && endDate) {
      let numWeekdays = moment().weekdayCalc(startDate.toDate(), endDate.toDate(), [1,2,3,4,5])
      this.setState({
        numWeekdays: numWeekdays,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }, () => console.log(this.state))
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

  render() {
    return (
      <div className="container">
        <Menu />
        {this.state.freelancerInfo ? (
          <>
          <div className={this.state.bookCategory ? "book-container book-container-fullscreen" : "book-container"}>

            {this.state.bookCategory
              ? <div className="pricing-container flex-column">
                <div className="flex-column">
                <p style={{marginTop: "0", marginBottom: "20px"}}><b>DETAILS</b></p>
                <RangeDatePicker
                  startDatePlaceholder="Start Date"
                  endDatePlaceholder="End Date"
                  minDate={new Date()}
                  disabled={false}
                  className="book-calendar"
                  startWeekDay="sunday"
                  onChange={(startDate, endDate) => this.onDateChange(startDate, endDate)}
                />
                <br/>
                <i className="subtitle">Please note: freelancers are only expected to work on business days. At Stint, we believe in a healthy work-life balance.</i>
                <br/>
                <div className="flex-row" style={{margin: "0", width: "100%", alignItems: "center"}}>
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
                <i className="subtitle">More text explaining pricing and benchmarks.</i>
                <i className="subtitle">Information about money back for cancelled stints.</i>
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


            <div className={this.state.bookCategory ? "flex-column half-container" : null} style={{position: "relative"}}>
              <div className={this.state.bookCategory ? "book-title-opened" : "flex-row book-title"}>
                <img
                  src={this.state.freelancerInfo.avatarUrl}
                ></img>
                <p>Book {this.state.freelancerInfo.displayName.split(" ")[0]} for {" "}
                  <select
                    name="booking-category"
                    className="booking-category-select"
                    onChange={this.handleSelect}>
                    <option value="">(insert task)</option>
                    <optgroup label="design">
                      <option value="web design">web design</option>
                      <option value="wireframes">wireframes</option>
                    </optgroup>
                    <optgroup label="Software Development">
                      <option value="front-end">front-end</option>
                      <option value="app development">app development</option>
                    </optgroup>
                  </select></p>
              </div>

          <i className="subtitle" style={{color: "white"}}>First time booking on Stint? Learn more about our process here.</i>

            <div className="flex-column">
            <p style={{color: "white"}}><b>PROJECT OVERVIEW</b></p>
            <textarea
              className="book-textarea"
              placeholder={`Give ${this.state.freelancerInfo.displayName.split(" ")[0]} a brief description of what your stint entails. No need to explain every little detail, but give enough that s/he has a basic understanding of the requirements.`}></textarea>

            </div>
            <CheckoutButton
              uid={`https://wearestint.com/profile/${this.props.match.params.uid}`}
              startDate={this.state.startDate}
              endDate={this.state.endDate}/>
          </div>

          </div>

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
                    ? `& ` +
                      this.state.freelancerInfo.profile.education.minors[0] +
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

                {this.state.freelancerInfo.profile.dataAnalytics
                  .personalWebsiteUrl ? (
                  <div className="profile-works">
                    <div className="section-header">My personal website</div>
                    <a
                      className="personal-website"
                      href={
                        this.state.freelancerInfo.profile.dataAnalytics
                          .personalWebsiteUrl
                      }
                      target="_blank"
                    >
                      <img
                        src={require("./imgs/macbook.png")}
                        className="works-laptop"
                      ></img>
                      <iframe
                        src={
                          this.state.freelancerInfo.profile.dataAnalytics
                            .personalWebsiteUrl
                        }
                        className="works-laptop-screen"
                      ></iframe>
                    </a>
                  </div>
                ) : null}

                {this.state.githubData ? (
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
                                      {repoArray[1] ? (
                                        <>{repoArray[1]}</>
                                      ) : null}
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
                                      className="works-section-item works-section-item-link"
                                      href={orgArray[2]}
                                      target="_blank"
                                    >
                                      <b>{orgArray[0]}</b>
                                      <br />
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

                {this.state.freelancerInfo.profile.contentCreation
                  .personalWebsiteUrl ? (
                  <div className="profile-works">
                    <div className="section-header">My personal website</div>
                    <a
                      className="personal-website"
                      href={
                        this.state.freelancerInfo.profile.contentCreation
                          .personalWebsiteUrl
                      }
                      target="_blank"
                    >
                      <img
                        src={require("./imgs/macbook.png")}
                        className="works-laptop"
                      ></img>
                      <iframe
                        src={
                          this.state.freelancerInfo.profile.contentCreation
                            .personalWebsiteUrl
                        }
                        className="works-laptop-screen"
                      ></iframe>
                    </a>
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

                {this.state.freelancerInfo.profile.design.personalWebsiteUrl ? (
                  <div className="profile-works">
                    <div className="section-header">My personal website</div>
                    <a
                      className="personal-website"
                      href={
                        this.state.freelancerInfo.profile.design
                          .personalWebsiteUrl
                      }
                      target="_blank"
                    >
                      <img
                        src={require("./imgs/macbook.png")}
                        className="works-laptop"
                      ></img>
                      <iframe
                        src={
                          this.state.freelancerInfo.profile.design
                            .personalWebsiteUrl
                        }
                        className="works-laptop-screen"
                      ></iframe>
                    </a>
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

                {this.state.freelancerInfo.profile.softwareDev
                  .personalWebsiteUrl ? (
                  <div className="profile-works">
                    <div className="section-header">My personal website</div>
                    <a
                      className="personal-website"
                      href={
                        this.state.freelancerInfo.profile.softwareDev
                          .personalWebsiteUrl
                      }
                      target="_blank"
                    >
                      <img
                        src={require("./imgs/macbook.png")}
                        className="works-laptop"
                      ></img>
                      <iframe
                        src={
                          this.state.freelancerInfo.profile.softwareDev
                            .personalWebsiteUrl
                        }
                        className="works-laptop-screen"
                      ></iframe>
                    </a>
                  </div>
                ) : null}

                {this.state.githubData ? (
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
                                      {repoArray[1] ? (
                                        <>
                                          <br /> {repoArray[1]}
                                        </>
                                      ) : null}
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
                                      className="works-section-item works-section-item-link"
                                      href={orgArray[2]}
                                      target="_blank"
                                    >
                                      <b>{orgArray[0]}</b>
                                      <br />
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
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(ProfileView);
