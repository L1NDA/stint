import React from 'react';
import './style/profile.css';
import Menu from './Menu.js';
import Footer from './Footer.js'
import Button from './Button.js'
import StudentInfo from './StudentInfo.js'
import StudentSkills from './StudentSkills.js'
import Select from './Select.js'
import Autocomplete from './Autocomplete.js'
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
const {setFreelancerProfile} = require('../api/freelancer')

class ProfileCreation extends React.Component {

  constructor(){
    super();
    this.state = {
      continue: true,
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
      checkbox: false
    }
  }

  handleChange = (name, content) => {
    this.setState({
      [name]: content
    })
  }

  toggleCheck = () => {
    this.setState({
      checkbox: !this.state.checkbox
    })
  }

  updateChildInfo = (stateName, content, index) => {
    let cleanedState;
    let temp;
    if (index) {
      cleanedState = stateName.replace(/[^A-Za-z]+/g, '')
      temp = this.state[cleanedState]
      temp[index] = content
    } else {
      cleanedState = stateName
      temp = content
    }

    this.setState({
      [cleanedState]: temp
    }, function() {
      if (this.state.year && this.state.colleges && this.state.major && this.state.minor && this.state.city && this.state.state && this.state.role[0] && this.state.company[0] && this.state.ec[0] && this.state.ecrole[0]) {
        this.setState({continue: true})
      }
      // else if (this.state.continue === true) {
      //   this.setState({continue: false})
      // }
    })
  }

  saveAllChildren = (section, state) => {
    this.setState({
      [section]: state
    })
  }

  submitProfile = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const temp = this.state
    let doesData = Object.keys(temp.da).length !== 0
    let doesDesign = Object.keys(temp.db).length !== 0
    let doesContent = Object.keys(temp.ccm).length !== 0
    let doesSoftware = Object.keys(temp.sd).length !== 0

    setFreelancerProfile(this.props.userUid,
                         temp.year, temp.colleges, temp.major, temp.minor,
                         temp.city, temp.state,
                         temp.role, temp.company, temp.yearcompany,
                         temp.ecrole, temp.ec, temp.yearec,
                         doesData, temp.da.da0, temp.da.skills, temp.da.awardCategories, temp.da.awardContent, temp.da.awardProviders,
                         doesDesign, temp.db.db0, temp.db.skills, temp.db.awardCategories, temp.db.awardContent, temp.db.awardProviders,
                         doesContent, temp.ccm.ccm0, temp.ccm.ccm1, temp.ccm.ccm2, temp.ccm.ccm3, temp.ccm.skills, temp.ccm.awardCategories, temp.ccm.awardContent, temp.ccm.awardProviders,
                         doesSoftware, temp.sd.sd0, temp.sd.sd1, temp.sd.skills, temp.sd.awardCategories, temp.sd.awardContent, temp.sd.awardProviders,
                         temp.phonenum)
    this.props.analytics.logEvent("sign_up")
  }

  render() {
    const temp = this.state
    let doesData = Object.keys(temp.da).length !== 0
    let doesDesign = Object.keys(temp.db).length !== 0
    let doesContent = Object.keys(temp.ccm).length !== 0
    let doesSoftware = Object.keys(temp.sd).length !== 0

    let finishedApp = (temp.phonenum && this.state.checkbox) || (temp.phoneYN === "No" && this.state.checkbox) ? false : true

    return (
      <div className="container">

      <Menu/>


      <form className="padding flex-column profile-container" onSubmit={this.submitProfile} autocomplete="off">
        <div className="stint-dialogue">
          <h2>Nice to meet you{this.props.userDisplayName ? " " + this.props.userDisplayName.split(" ")[0] : ""}!</h2>
          <h3>We’re Stint, a platform for connecting students and companies. <br/> Now tell us a little bit about yourself!</h3>
        </div>

        <StudentInfo saveToParent={this.updateChildInfo}/>

        <div className={this.state.continue ? "stint-dialogue" : "loading"}>
          <h2>Look at you, out there doing things!</h2>
          <h3>You’re almost there – just let us know which skills you'd like to provide to companies and you’ll have your very own Stint profile.</h3>
        </div>

        {this.state.continue ? <StudentSkills saveToParent={this.saveAllChildren}/> : null}

        <div className={doesData || doesDesign || doesContent || doesSoftware ? "stint-dialogue" : "loading"}>
          <h2>One last thing...</h2>
          <h3>As recent college grads, we can totally relate to having thousands of unread emails in the inbox. If you’d like us to notify you via text to help you avoid those awkward missed-your-email moments, let us know down below.</h3>
          <p>We’ll only text you about site activity that is important and relevant to you, like if an employer wants to connect.</p>
        </div>

        { doesData || doesDesign || doesContent || doesSoftware ?
          <div className="student-dialogue">
            <h3 style={{margin: '0'}}><Select items={["Yes", "No"]} name="phoneYN" saveData={this.handleChange} have="true"/>
              {this.state.phoneYN === "Yes" ? <span>, please</span> : <span>, do not</span>} send me text updates
              {this.state.phoneYN === "Yes" ? <span> at <Autocomplete
                   name="phonenum"
                   placeholder="(insert phone number*)"
                   saveData={this.handleChange}
                   type="number"/>.
               </span> : <span>.</span>}
            </h3>

          </div> : null}

        <div>
          <div style={{marginTop: "50px", marginBottom: "50px"}} className="flex-row">
            <input type="checkbox" id="confirm" name="confirm" style={{marginRight: "10px"}} onChange={this.toggleCheck}/>
              <label for="confirm" className="subtitle" >
                <b>By checking this box, you ensure that all the information you’ve provided is truthful and accurate to the best of your knowledge.*</b> <br/> Our team will verify your information within the next 48 hours, and we’ll get back to you when your profile is all set to be published!</label>
          </div>

          <button className="button" style={{marginBottom: "25px"}} disabled={finishedApp}>Create my profile</button>
          <div className="subtitle" style={{marginBottom: "100px"}}>By pressing this button, you're agreeing to our Terms and Conditions and Privacy Policy.</div>
        </div>


      </form>
      <Footer/>

      </div>

    )
  }
}

function mapStateToProps(state, props) {
  const { firebase } = props
  return {
    userUid: state.firebase.auth.uid,
    userDisplayName: state.firebase.auth.displayName,
    analytics: firebase.analytics()
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(ProfileCreation);
