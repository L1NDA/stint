import React from 'react';
import './style/profile.css';
import Menu from './Menu.js';
import Footer from './Footer.js'
import Button from './Button.js'
import StudentInfo from './StudentInfo.js'
import StudentSkills from './StudentSkills.js'
import app from 'firebase/app';
import 'firebase/database';

class ProfileCreation extends React.Component {

  constructor(){
    super();
    this.state = {
      continue: true,
      role: [null, null, null],
      company: [null, null, null],
      ec: [null, null, null],
      ecrole: [null, null, null],
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
      if (this.state.year && this.state.colleges && this.state.majors && this.state.minors && this.state.city && this.state.state && this.state.role[0] && this.state.company[0] && this.state.ec[0] && this.state.ecrole[0]) {
        this.setState({continue: true})
      }
      // else if (this.state.continue === true) {
      //   this.setState({continue: false})
      // }
    })

  }

  render() {

    return (
      <div className="container">

      <Menu/>

      <div className="padding flex-column profile-container">
        <div className="stint-dialogue">
          <h2>Nice to meet you, Linda Q.</h2>
          <h3>We’re Stint, a platform for connecting students and companies. <br/> Now tell us a little bit about yourself!</h3>
        </div>

        <StudentInfo saveToParent={this.updateChildInfo}/>

        <div className={this.state.continue ? "stint-dialogue" : "loading"}>
          <h2>Look at you, out there doing things!</h2>
          <h3>You’re almost there – just let us know which skills you'd like to provide to companies and you’ll have your very own Stint profile.</h3>
        </div>

        <StudentSkills saveToParent={this.updateChildInfo}/>

      </div>

      <Footer/>

      </div>

    )
  }
}

export default ProfileCreation;
