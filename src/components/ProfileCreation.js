import React from 'react';
import './style/profile.css';
import Menu from './Menu.js';
import Footer from './Footer.js'
import Button from './Button.js'
import StudentInfo from './StudentInfo.js'
import StudentSkills from './StudentSkills.js'
import app from 'firebase/app';
import 'firebase/database';
const {setFreelancerProfile} = require('../api/freelancer')
const { authUi, authUiConfig, getSignedInUser } = require('../api/auth')

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
      da: {},
      db: {},
      ccm: {},
      sd: {}
    }
  }

  componentDidMount = async () => {
    if (await getSignedInUser) {
      this.setState({
        signedIn: true
      }, () => console.log(this.state.signedIn))
    }
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
      console.log(this.state)
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

    setFreelancerProfile(temp.year, temp.colleges, temp.major, temp.minor,
                         temp.city, temp.state,
                         temp.role, temp.company,
                         temp.ecrole, temp.ec,
                         doesData, temp.da.da0, temp.da.skills, temp.da.awardCategories, temp.da.awardContent,
                         doesDesign, temp.db.db0, temp.db.skills, temp.db.awardCategories, temp.db.awardContent,
                         doesContent, temp.ccm.ccm0, temp.ccm.ccm1, temp.ccm.ccm2, temp.ccm.ccm3, temp.ccm.skills, temp.ccm.awardCategories, temp.ccm.awardContent,
                         doesSoftware, temp.sd.sd0, temp.sd.sd1, temp.sd.skills, temp.sd.awardCategories, temp.sd.awardContent)
  }

  render() {

    return (
      <div className="container">

      <Menu/>

    { this.state.signedIn ?
      <form className="padding flex-column profile-container" onSubmit={this.submitProfile}>
        <div className="stint-dialogue">
          <h2>Nice to meet you, Linda Q.</h2>
          <h3>We’re Stint, a platform for connecting students and companies. <br/> Now tell us a little bit about yourself!</h3>
        </div>

        <StudentInfo saveToParent={this.updateChildInfo}/>

        <div className={this.state.continue ? "stint-dialogue" : "loading"}>
          <h2>Look at you, out there doing things!</h2>
          <h3>You’re almost there – just let us know which skills you'd like to provide to companies and you’ll have your very own Stint profile.</h3>
        </div>

        <StudentSkills saveToParent={this.saveAllChildren}/>

        <Button style={{marginTop: "100px", marginBottom: "100px"}} text="Create my profile"/>

      </form> : <h3>Oops!</h3>
    }



      <Footer/>

      </div>

    )
  }
}

export default ProfileCreation;
