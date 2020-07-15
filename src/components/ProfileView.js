import React from "react";
import Menu from "./Menu.js";
import Footer from "./Footer.js";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import "./style/my-profile.css";
import { IoLogoGithub } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import { AiFillMediumCircle, AiFillInstagram } from "react-icons/ai";
import { getFreelancerRef } from "../api/freelancer";
import { TiSortNumericallyOutline } from "react-icons/ti";
import { getInstaInfo } from "../api/instagram";
import medium, { getMediumInfo } from "../api/medium";
import { getGithubInfo } from "../api/github";
import ReactLoading from "react-loading";

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

class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {};
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
    console.log("COMPOENENT DID MOUNT");
    let fileUrls = await this.getFilesFromStorage();

    let freelancerRef = await getFreelancerRef(this.props.auth.uid);
    freelancerRef.on(
      "value",
      async (snapshot) => {
        console.log("COMPOENENT DID MOUNT FREELANCERRE");
        let info = snapshot.val();
        let profile = info.profile;

        if (!profile) {
          this.props.history.push(PROFILE_CREATION_PATH);
          return;
        }

        let githubUsername = null;
        let instaUsername = null;
        let mediumUsername = null;
        console.log(profile);
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

<<<<<<< Updated upstream
        if (githubUsername) {
          try {
            githubData = await getGithubInfo(githubUsername);
          } catch (err) {
            await this.props.analytics.logEvent(GITHUB_FUNCTIONS_ERROR);
          }
=======
      if (githubUsername) {
        try {
          githubData = await getGithubInfo("lellalfsdlasllsdgllgs")
        } catch (err) {
          await this.props.analytics.logEvent("github_functions_error")
>>>>>>> Stashed changes
        }

        if (instaUsername) {
          try {
            instaData = await getInstaInfo(instaUsername);
          } catch (err) {
            await this.props.analytics.logEvent(INSTAGRAM_FUNCTIONS_ERROR);
          }
        }

<<<<<<< Updated upstream
        if (mediumUsername) {
          try {
            console.log("WHYYYY");
            mediumData = await getMediumInfo(mediumUsername);
          } catch (err) {
            await this.props.analytics.logEvent(MEDIUM_FUNCTIONS_ERROR);
          }
=======
      if (mediumUsername) {
        try {
         mediumData = await getMediumInfo(mediumUsername)
        } catch (err) {
          await this.props.analytics.logEvent("medium_functions_error")
>>>>>>> Stashed changes
        }

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

  getFilesFromStorage = async () => {
    let storageRef = this.props.storage.ref();
    let filesRef = storageRef.child("images" + "/" + this.props.auth.uid);
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
            <section className="padding flex-row profile-item">
              <img
                id="profile-img"
                src={this.props.auth.photoURL}
                className="my-profile-img"
              ></img>
              <div>
                <h1 style={{ margin: "0" }}>
                  {this.props.auth.displayName.split(" ")[0]}
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
<<<<<<< Updated upstream
                          {
                            this.state.freelancerInfo.profile.workExperience
                              .companyRoles[index]
                          }{" "}
                          @ <b> {company}</b>
=======
                          : <div className="works-section">
                            <div className="works-section-header">(No public organizations to show.)</div>
                          </div>
                        }

                      </a> : "null"
                    }

                    {this.state.freelancerInfo.profile.dataAnalytics.personalWebsiteUrl ?
                      <a className="works-item" href={this.state.freelancerInfo.profile.dataAnalytics.personalWebsiteUrl} target="_blank">
                        <div className="works-header gray">
                          <FiLink className="works-header-img"/>
                          My personal website
                        </div>
                        <div className="works-section">
                          <img src={require('./imgs/macbook.png')} className="works-laptop"></img>
                          <img src={this.state.fileUrls.personalWebsite} className="works-laptop-screen"></img>
>>>>>>> Stashed changes
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

                {this.state.githubData ||
                this.state.freelancerInfo.profile.dataAnalytics
                  .personalWebsiteUrl ? (
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

                      {this.state.freelancerInfo.profile.dataAnalytics
                        .personalWebsiteUrl ? (
                        <a
                          className="works-item"
                          href={
                            this.state.freelancerInfo.profile.dataAnalytics
                              .personalWebsiteUrl
                          }
                          target="_blank"
                        >
                          <div className="works-header gray">
                            <FiLink className="works-header-img" />
                            My personal website
                          </div>
                          <div className="works-section">
                            <img
                              src={require("./imgs/macbook.png")}
                              className="works-laptop"
                            ></img>
                            <img
                              src={this.state.fileUrls.personalWebsite}
                              className="works-laptop-screen"
                            ></img>
                          </div>
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

                {this.state.mediumData ||
                this.state.instaData ||
                this.state.freelancerInfo.profile.contentCreation
                  .personalWebsiteUrl ? (
                  <div className="profile-works">
                    <div className="section-header">My work(s)</div>
                    <div className="works-container">
                      <div className="flex-column works-col-wrapper">
                        {this.state.mediumData &&
                        this.state.mediumData.data.publications !== 0 ? (
                          <a
                            className="works-item column-works-item"
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

                        {this.state.instaData &&
                        !this.state.instaData.isPrivate ? (
                          <a
                            className="works-item column-works-item"
                            href={`https://www.instagram.com/${this.state.freelancerInfo.profile.contentCreation.instagramUser.slice(
                              1
                            )}`}
                          >
                            <div className="works-header instagram">
                              <AiFillInstagram className="works-header-img" />
                              Instagram
                            </div>

                            <div className="works-section flex-row">
                              <img
                                src={this.state.instaData.data.profilePhoto}
                                className="insta-propic"
                              ></img>
                              <div
                                className="flex-column"
                                style={{ justifyContent: "center" }}
                              >
                                <b className="insta-handle">
                                  {
                                    this.state.freelancerInfo.profile
                                      .contentCreation.instagramUser
                                  }
                                </b>
                                <div className="insta-handle">
                                  {this.state.instaData.data.numFollowers}{" "}
                                  followers
                                </div>
                              </div>
                            </div>

                            <div className="works-section insta-grid">
                              {this.state.instaData.data.photos.map(
                                (img, index) => {
                                  return (
                                    <div
                                      style={{ backgroundImage: `url(${img})` }}
                                      className="insta-img"
                                    ></div>
                                  );
                                }
                              )}
                            </div>
                          </a>
                        ) : null}
                      </div>

                      {this.state.freelancerInfo.profile.contentCreation
                        .personalWebsiteUrl ? (
                        <a
                          className="works-item"
                          href={
                            this.state.freelancerInfo.profile.contentCreation
                              .personalWebsiteUrl
                          }
                          target="_blank"
                        >
                          <div className="works-header gray">
                            <FiLink className="works-header-img" />
                            My personal website
                          </div>
                          <div className="works-section">
                            <img
                              src={require("./imgs/macbook.png")}
                              className="works-laptop"
                            ></img>
                            <img
                              src={this.state.fileUrls.personalWebsite}
                              className="works-laptop-screen"
                            ></img>
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

                {this.state.freelancerInfo.profile.design.personalWebsiteUrl ||
                this.state.fileUrls.designShowcase ? (
                  <div className="profile-works">
                    <div className="section-header">My work(s)</div>
                    <div className="works-container">
                      {this.state.freelancerInfo.profile.design
                        .personalWebsiteUrl ? (
                        <a
                          className="works-item"
                          href={
                            this.state.freelancerInfo.profile.design
                              .personalWebsiteUrl
                          }
                          target="_blank"
                        >
                          <div className="works-header gray">
                            <FiLink className="works-header-img" />
                            My personal website
                          </div>
                          <div className="works-section">
                            <img
                              src={require("./imgs/macbook.png")}
                              className="works-laptop"
                            ></img>
                            <img
                              src={this.state.fileUrls.personalWebsite}
                              className="works-laptop-screen"
                            ></img>
                          </div>
                        </a>
                      ) : null}

                      {this.state.fileUrls.designShowcase ? (
                        <a
                          className="works-item"
                          href={this.state.fileUrls.designShowcase}
                          target="_blank"
                        >
                          <div className="works-header gray">
                            <FiLink className="works-header-img" />
                            My work
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

                {this.state.githubData ||
                this.state.freelancerInfo.profile.softwareDev
                  .personalWebsiteUrl ? (
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

                          {this.state.githubData.data.orgs !== 0 ? (
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

                      {this.state.freelancerInfo.profile.softwareDev
                        .personalWebsiteUrl ? (
                        <a
                          className="works-item"
                          href={
                            this.state.freelancerInfo.profile.softwareDev
                              .personalWebsiteUrl
                          }
                          target="_blank"
                        >
                          <div className="works-header gray">
                            <FiLink className="works-header-img" />
                            My personal website
                          </div>
                          <div className="works-section">
                            <img
                              src={require("./imgs/macbook.png")}
                              className="works-laptop"
                            ></img>
                            <img
                              src={this.state.fileUrls.personalWebsite}
                              className="works-laptop-screen"
                            ></img>
                          </div>
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
