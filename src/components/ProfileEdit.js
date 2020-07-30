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

const FREELANCER_CATEGORIES = [
  "da",
  "ccm",
  "db",
  "sd",
];

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
    let freelancerInfo;
    freelancerRef.on("value", (snapshot) => {
      let profile = snapshot.val().profile

      let da = 
        Object.keys(profile.dataAnalytics).length > 0
          ? {
            da0: profile.dataAnalytics.githubUser ? profile.dataAnalytics.githubUser : null,
            da1: profile.dataAnalytics.personalWebsiteUrl ? profile.dataAnalytics.personalWebsiteUrl : null,
            daHave0: profile.dataAnalytics.githubUser ? "have" : "do not have",
            daHave1: profile.dataAnalytics.personalWebsiteUrl ? "have" : "do not have",
            daHaveAward: profile.dataAnalytics.awardCategories ? "have" : "have not",
            daHaveAward1: profile.dataAnalytics.awardCategories && profile.dataAnalytics.awardCategories[1] ? "have" : "have not",
            daHaveAward2: profile.dataAnalytics.awardCategories && profile.dataAnalytics.awardCategories[2] ? "have" : "have not",
            daHaveAwardCategory: profile.dataAnalytics.awardCategories && profile.dataAnalytics.awardCategories[0] ? profile.dataAnalytics.awardCategories[0] : null,
            daHaveAwardCategory1: profile.dataAnalytics.awardCategories && profile.dataAnalytics.awardCategories[1] ? profile.dataAnalytics.awardCategories[1] : null,
            daHaveAwardCategory2: profile.dataAnalytics.awardCategories && profile.dataAnalytics.awardCategories[2] ? profile.dataAnalytics.awardCategories[2] : null,
            daHaveAwardContent: profile.dataAnalytics.awardContent && profile.dataAnalytics.awardContent[0] ? profile.dataAnalytics.awardContent[0] : null,
            daHaveAwardContent1: profile.dataAnalytics.awardContent && profile.dataAnalytics.awardContent[1] ? profile.dataAnalytics.awardContent[1] : null,
            daHaveAwardContent2: profile.dataAnalytics.awardContent && profile.dataAnalytics.awardContent[2] ? profile.dataAnalytics.awardContent[2] : null,
            daHaveAwardProvider: profile.dataAnalytics.awardProviders && profile.dataAnalytics.awardProviders[0] ? profile.dataAnalytics.awardProviders[0] : null,
            daHaveAwardProvider1: profile.dataAnalytics.awardProviders && profile.dataAnalytics.awardProviders[1] ? profile.dataAnalytics.awardProviders[1] : null,
            daHaveAwardProvider2: profile.dataAnalytics.awardProviders && profile.dataAnalytics.awardProviders[2] ? profile.dataAnalytics.awardProviders[2] : null,
            details: false,
            files: null,
            skills: profile.dataAnalytics.skills ? profile.dataAnalytics.skills : {},
            width: "151px",
          }
          : {}

      let db = 
        profile.design && Object.keys(profile.design).length > 0
          ? {
            db0: profile.design.personalWebsiteUrl ? profile.design.personalWebsiteUrl : null,
            dbHave0: profile.design.personalWebsiteUrl ? "have" : "do not have",
            dbHaveAward: profile.design.awardCategories ? "have" : "have not",
            dbHaveAward1: profile.design.awardCategories && profile.design.awardCategories[1] ? "have" : "have not",
            dbHaveAward2: profile.design.awardCategories && profile.design.awardCategories[2] ? "have" : "have not",
            dbHaveAwardCategory: profile.design.awardCategories && profile.design.awardCategories[0] ? profile.design.awardCategories[0] : null,
            dbHaveAwardCategory1: profile.design.awardCategories && profile.design.awardCategories[1] ? profile.design.awardCategories[1] : null,
            dbHaveAwardCategory2: profile.design.awardCategories && profile.design.awardCategories[2] ? profile.design.awardCategories[2] : null,
            dbHaveAwardContent: profile.design.awardContent && profile.design.awardContent[0] ? profile.design.awardContent[0] : null,
            dbHaveAwardContent1: profile.design.awardContent && profile.design.awardContent[1] ? profile.design.awardContent[1] : null,
            dbHaveAwardContent2: profile.design.awardContent && profile.design.awardContent[2] ? profile.design.awardContent[2] : null,
            dbHaveAwardProvider: profile.design.awardProviders && profile.design.awardProviders[0] ? profile.design.awardProviders[0] : null,
            dbHaveAwardProvider1: profile.design.awardProviders && profile.design.awardProviders[1] ? profile.design.awardProviders[1] : null,
            dbHaveAwardProvider2: profile.design.awardProviders && profile.design.awardProviders[2] ? profile.design.awardProviders[2] : null,
            details: false,
            files: null,
            haveFileUpload: "have",
            skills: profile.design.skills ? profile.design.skills : {},
            width: "151px",
          }
          : {}

      let ccm = 
        profile.contentCreation && Object.keys(profile.contentCreation).length > 0
          ? {
            ccm0: profile.contentCreation.mediumUser ? profile.contentCreation.mediumUser : null,
            ccm1: profile.contentCreation.instagramUser ? profile.contentCreation.instagramUser : null,
            ccm2: profile.contentCreation.youtubeUser ? profile.contentCreation.youtubeUser : null,
            ccm3: profile.contentCreation.personalWebsiteUrl ? profile.contentCreation.personalWebsiteUrl : null,
            ccmHave0: profile.contentCreation.mediumUser ? "have" : "do not have",
            ccmHave1: profile.contentCreation.instagramUser ? "have" : "do not have",
            ccmHave2: profile.contentCreation.youtubeUser ? "have" : "do not have",
            ccmHave3: profile.contentCreation.personalWebsiteUrl ? "have" : "do not have",
            ccmHaveAward: profile.contentCreation.awardCategories ? "have" : "have not",
            ccmHaveAward1: profile.contentCreation.awardCategories && profile.contentCreation.awardCategories[1] ? "have" : "have not",
            ccmHaveAward2: profile.contentCreation.awardCategories && profile.contentCreation.awardCategories[2] ? "have" : "have not",
            ccmHaveAwardCategory: profile.contentCreation.awardCategories && profile.contentCreation.awardCategories[0] ? profile.contentCreation.awardCategories[0] : null,
            ccmHaveAwardCategory1: profile.contentCreation.awardCategories && profile.contentCreation.awardCategories[1] ? profile.contentCreation.awardCategories[1] : null,
            ccmHaveAwardCategory2: profile.contentCreation.awardCategories && profile.contentCreation.awardCategories[2] ? profile.contentCreation.awardCategories[2] : null,
            ccmHaveAwardContent: profile.contentCreation.awardContent && profile.contentCreation.awardContent[0] ? profile.contentCreation.awardContent[0] : null,
            ccmHaveAwardContent1: profile.contentCreation.awardContent && profile.contentCreation.awardContent[1] ? profile.contentCreation.awardContent[1] : null,
            ccmHaveAwardContent2: profile.contentCreation.awardContent && profile.contentCreation.awardContent[2] ? profile.contentCreation.awardContent[2] : null,
            ccmHaveAwardProvider: profile.contentCreation.awardProviders && profile.contentCreation.awardProviders[0] ? profile.contentCreation.awardProviders[0] : null,
            ccmHaveAwardProvider1: profile.contentCreation.awardProviders && profile.contentCreation.awardProviders[1] ? profile.contentCreation.awardProviders[1] : null,
            ccmHaveAwardProvider2: profile.contentCreation.awardProviders && profile.contentCreation.awardProviders[2] ? profile.contentCreation.awardProviders[2] : null,
            details: false,
            files: null,
            skills: profile.contentCreation.skills ? profile.contentCreation.skills : {},
            width: "151px",
          }
          : {} 

      let sd = 
        profile.softwareDev && Object.keys(profile.softwareDev).length > 0
          ? {
            sd0: profile.softwareDev.githubUser ? profile.softwareDev.githubUser : null,
            sd1: profile.softwareDev.personalWebsiteUrl ? profile.softwareDev.personalWebsiteUrl : null,
            sdHave0: profile.softwareDev.githubUser ? "have" : "do not have",
            sdHave1: profile.softwareDev.personalWebsiteUrl ? "have" : "do not have",
            sdHaveAward: profile.softwareDev.awardCategories ? "have" : "have not",
            sdHaveAward1: profile.softwareDev.awardCategories && profile.softwareDev.awardCategories[1] ? "have" : "have not",
            sdHaveAward2: profile.softwareDev.awardCategories && profile.softwareDev.awardCategories[2] ? "have" : "have not",
            sdHaveAwardCategory: profile.softwareDev.awardCategories && profile.softwareDev.awardCategories[0] ? profile.softwareDev.awardCategories[0] : null,
            sdHaveAwardCategory1: profile.softwareDev.awardCategories && profile.softwareDev.awardCategories[1] ? profile.softwareDev.awardCategories[1] : null,
            sdHaveAwardCategory2: profile.softwareDev.awardCategories && profile.softwareDev.awardCategories[2] ? profile.softwareDev.awardCategories[2] : null,
            sdHaveAwardContent: profile.softwareDev.awardContent && profile.softwareDev.awardContent[0] ? profile.softwareDev.awardContent[0] : null,
            sdHaveAwardContent1: profile.softwareDev.awardContent && profile.softwareDev.awardContent[1] ? profile.softwareDev.awardContent[1] : null,
            sdHaveAwardContent2: profile.softwareDev.awardContent && profile.softwareDev.awardContent[2] ? profile.softwareDev.awardContent[2] : null,
            sdHaveAwardProvider: profile.softwareDev.awardProviders && profile.softwareDev.awardProviders[0] ? profile.softwareDev.awardProviders[0] : null,
            sdHaveAwardProvider1: profile.softwareDev.awardProviders && profile.softwareDev.awardProviders[1] ? profile.softwareDev.awardProviders[1] : null,
            sdHaveAwardProvider2: profile.softwareDev.awardProviders && profile.softwareDev.awardProviders[2] ? profile.softwareDev.awardProviders[2] : null,
            details: false,
            files: null,
            skills: profile.softwareDev.skills ? profile.softwareDev.skills : {},
            width: "151px",
          }
          : {} 


      this.setState({
        freelancerRef,
        freelancerInfo: snapshot.val(),

        year: profile.education.year,
        colleges: profile.education.school,
        major: profile.education.majors,
        minor: profile.education.minors ? profile.education.minors : [null, null],

        city: profile.residenceInfo.city,
        state: profile.residenceInfo.state,

        role: profile.workExperience.companyRoles,
        company: profile.workExperience.companies,
        yearcompany: profile.workExperience.companyYears,

        ecrole: profile.orgExperience.orgRoles,
        ec: profile.orgExperience.organizations,
        yearec: profile.orgExperience.orgYears,

        da: da,
        db: db,
        ccm: ccm,
        sd: sd,
      });
    });
  };

  updateProfilePic = (profilePicFiles) => {
    console.log("update profile pic being called")
    var fileErrorHandler = document.getElementById("profile-file-error");
    if (profilePicFiles.length === 0) {
      fileErrorHandler.innerHTML = "Please upload a file.";
      return;
    }

    // First check if a profile pic already exists - if so, delete it.
    let prevProPic = this.props.storage.ref(
      "images" + 
      "/" +
      this.props.userUid +
      "/" +
      "profilepic"
    )
    prevProPic.delete()
      .then(() =>{
        console.log("Previous profile picture deleted successfully")
      })
      .catch(() => {
        console.log("Previous profile picture did not exist")
      })

    const acceptedFileTypes = [".png", ".jpg", ".jpeg", ".svg"];
    // check file type is accepted and that it is below 10MB (in bytes)
    if (
      acceptedFileTypes.some((type) =>
        profilePicFiles[0].name.endsWith(type)
      ) &&
      profilePicFiles[0].size <= 10000000
    ) {
      let fileRef = this.props.storage.ref(
        "images" +
          "/" +
          this.props.userUid +
          "/" +
          "profilepic"
      );
      let uploadTask = fileRef.put(profilePicFiles[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          fileErrorHandler.innerHTML = `Upload is ${Math.round(
            progress
          )} % done`;
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              fileErrorHandler.innerHTML = "Not authorized";
              break;
            case "storage/canceled":
              fileErrorHandler.innerHTML = "Upload cancelled";
              break;
            case "storage/unknown":
              fileErrorHandler.innerHTML = "Unknown error, please try again";
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.state.freelancerRef.child("avatarUrl").set(downloadURL);
            document.getElementById("profile-img").src = downloadURL;
            fileErrorHandler.innerHTML = `Successfully uploaded ${profilePicFiles[0].name}`;
          });
        }
      );
    }
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
          this.state.year &&
          this.state.year !== "(select year*)" &&
          this.state.colleges &&
          this.state.major[0] &&
          this.state.city &&
          this.state.state &&
          this.state.role[0] &&
          this.state.company[0] &&
          this.state.yearcompany[0] &&
          this.state.yearcompany[0] !== "(insert year*)" &&
          this.state.ec[0] &&
          this.state.ecrole[0] &&
          this.state.yearec[0] &&
          this.state.yearec[0] !== "(insert year*)"
        ) {
          this.setState({ continue: true }, () => {
            console.log("continue true", this.state);
          });
        } else {
          if (this.state.continue) {
            this.setState({ continue: false }, () => {
              console.log("continue true", this.state);
            });
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

    console.log("state on submission", this.state)

    let temp = this.state;

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
      this.state.continue &&
      (doesData || doesDesign || doesContent || doesSoftware) &&
      ((temp.phonenum && this.state.checkbox) ||
        (temp.phoneYN === "No" && this.state.checkbox))
        ? false
        : true;

    return (
      <div className="container-stint">
        {this.state.freelancerRef ? (
          <>
            <Menu />

            <form
              className="padding flex-column profile-container"
              onSubmit={this.submitProfile}
              autocomplete="off"
            >
              <h1>Edit Profile</h1>
              <>
                <input
                  id="uploadProfilePic"
                  type="file"
                  onChange={(e) => {
                    this.updateProfilePic(e.target.files);
                  }}
                  required
                />
                <label for="uploadProfilePic">Test</label>
              </>
              <div
                className="subtitle"
                id="profile-file-error"
                style={{ marginTop: "10px" }}
              ></div>
              <div className="student-dialogue">
                <div className="flex-row-comp">
                  <div
                    onClick={this.updateProfilePic}
                    className="edit-profile-img"
                  >
                    <img
                      id="profile-img"
                      src={this.state.freelancerInfo.avatarUrl}
                      className="my-profile-img"
                    />
                    <div className="edit-profile-txt">Change image</div>
                  </div>
                  <div
                    className="flex-column"
                    style={{ justifyContent: "center" }}
                  >
                    <h1 style={{ margin: "0" }}>
                      {this.state.freelancerInfo.displayName.split(" ")[0]}
                    </h1>
                    <h3 style={{ margin: "0" }}>
                      I have a different preferred name:
                      <Autocomplete
                        name="preferredname"
                        placeholder="(insert preferred name*)"
                        saveData={this.handleChange}
                      />
                      .
                    </h3>
                  </div>
                </div>
              </div>

              <h2 style={{ color: "#474448" }}>Basic Info</h2>

              <StudentInfo
                saveToParent={this.updateChildInfo}
                residenceInfo={this.state.freelancerInfo.profile.residenceInfo}
                education={this.state.freelancerInfo.profile.education}
                orgExperience={this.state.freelancerInfo.profile.orgExperience}
                workExperience={
                  this.state.freelancerInfo.profile.workExperience
                }
              />

              <h2 style={{ color: "#474448" }}>My Stint Categories</h2>

              <div className="student-dialogue">
                <div className="student-dialogue-block">
                  {FREELANCER_CATEGORIES.map((category, index) => {
                    return Object.keys(this.state[category]).length > 0 ? (
                      <h3>
                        I am currently
                        <Select
                          items={["available", "not available"]}
                          name={`availablility-${category}`}
                          saveData={this.handleChange}
                          have={true}
                        />{" "}
                        for{" "}
                        {category === "da"
                          ? "data analytics"
                          : category === "ccm"
                          ? "content creation"
                          : category === "db"
                          ? "design and branding"
                          : "software development"}
                        .
                      </h3>
                    ) : null;
                  })}
                  <div className="subtitle" style={{ marginTop: "30px" }}>
                    (If you set yourself as ‘not available’ for a category, you
                    will not show up in relevant search results for that area.)
                  </div>
                </div>
              </div>

              <StudentSkills
                saveToParent={this.saveAllChildren}
                da={this.state.da}
                ccm={this.state.ccm}
                db={this.state.db}
                sd={this.state.sd}
              />

              <h2 style={{ color: "#474448" }}>Communication</h2>

              <div className="student-dialogue">
                <h3 style={{ margin: "0" }}>
                  <Select
                    items={["Yes", "No"]}
                    name="phoneYN"
                    saveData={this.handleChange}
                    have="true"
                    selected={
                      this.state.freelancerInfo.profile.phoneNum ? "Yes" : "No"
                    }
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
                        val={this.state.freelancerInfo.profile.phoneNum}
                      />
                      .
                    </span>
                  ) : (
                    <span>.</span>
                  )}
                </h3>
                <br />
                <div className="subtitle">
                  As recent college grads, we can totally relate to having
                  thousands of unread emails in the inbox. By enabling text
                  notifications, we hope to help you avoid those awkward
                  missed-your-email moments. We’ll only text you about site
                  activity that is important and relevant to you, like if an
                  employer wants to connect.
                </div>
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
  console.log("analytics", firebase.analytics());
  return {
    analytics: firebase.analytics(),
    storage: firebase.storage(),
    userUid: state.firebase.auth.uid,
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(ProfileEdit);
