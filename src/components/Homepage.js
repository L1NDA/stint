import React from 'react';
import './style/homepage.css';
import logo from './imgs/logo.png'
import homepageImage from './imgs/homepage.svg'
import Button from './Button.js'
import designers from './imgs/designers.svg'
import coders from './imgs/coders.svg'
import creatives from './imgs/creatives.svg'
import analysts from './imgs/analysts.svg'
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css'

import {checkAuth} from '../api/auth'
import {setCompanyBetaInfo} from '../api/company'

const {authUi, authUiConfig} = require('../api/auth')

const typingText = [
  [`Wireframes`, `User journeys`, `Lo-fi & hi-fi mockups`, `Website redesign`, `Prototyping`, `Branding`, `Logo design`],
  [`Web development`, `App development`, `QA Testing`, `Back-end & servers`, `Machine Learning`, ``, ``],
  [`Graphic design`, `Promotional materials`, `Photography`, `Videography`, `Social Media`, `Animations`, ``],
  [`Data analysis`, `Data-driven strategy`, `Visual analytics`, `Presentation of data`, `Data modeling`, ``, ``]]

authUi.start('#firebaseui-auth-container', authUiConfig);

class Homepage extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedName: './imgs/designers.svg',
      selectedNum: '0',
      showModal: false,
      text: '',
      email: '',
      dropdown: '',
      modal: false,
    }
  }

  changeName = (item, num) => {
    this.setState({
      selectedName: item,
      selectedNum: num
    })
  }

  handleButtonClick = () => {
    let temp = this.state.modal;
    this.setState({
      modal: !temp
    });
    console.log(checkAuth());
    setCompanyBetaInfo("stint", "wearestint@gmail.com", ["tech", "business"])
  }

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangeDropdown = event => {
    this.setState({ dropdown: event.target.value });
  };

  // guidGenerator() {
  //   var S4 = function() {
  //      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  //   };
  //   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  // }

  // onCreateMessage = async (event) => {
  //   event.preventDefault();
  //   await createProfile(this.state.email, this.state.name, this.state.dropdown, "password")

  //   this.setState({
  //     email: '',
  //     name: '',
  //     dropdown: '',
  //     modal: false });
  // };

  render() {

    return (
      <div className="homepage">
        <div className="modal" style={{display: this.state.modal ? 'block' : 'none'}} id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
        
        <div className="modal-screen"
             style={{display: this.state.modal ? 'block' : 'none'}}
             onClick={this.handleButtonClick}></div>


      <div className="covid">
      In light of COVID-19, we hope to support students and companies in any way we can. If you are a company looking to hire, we’d love
      to&nbsp;<a href="mailto:wearestint@gmail.com" className="url">hear from you.</a>
      </div>

      <div className="menu flex-row" style={{justifyContent: 'flex-start'}}>
        <div className="flex-row center">
          <img src={logo} style={{width: '36px'}}/>
          <div className="logo">Stint</div>
        </div>
      </div>

      <div className="flex-row center padding homepage-1" style={{paddingBottom: "100px"}}>
        <div className="homepage-text">
          <h1>No internship? <br/>No problem.</h1>
          <h3>We’re redefining the way students and companies connect through shorter, project-based stints.</h3>
          <div onClick={this.handleButtonClick}><Button text="Join the revolution" margin="50px"/></div>
        </div>
        <img src={homepageImage} className="homepage-image"/>
      </div>

      <div className="flex-row interstitial">
        <div className="interstitial-item">
          <h2>Build skills.</h2>
          <p>Bootcamps and extracurriculars are not the only way to obtain real-world experience while still being a full-time student. Gain industry experience, straight from the source.</p>
        </div>

        <div className="interstitial-item">
          <h2>Stay productive.</h2>
          <p>Have some extra time on your hands? Receive stints and earn some money for those next few burritos on your own time and pace.  </p>
        </div>

        <div className="interstitial-item">
          <h2>Break boundaries.</h2>
          <p>We believe in challenging the status quo. Spend your time doing meaningful projects, instead of networking. Highlight your skills, not your connections.</p>
        </div>
      </div>

      <div className="audience flex-row">
        <div className="flex-column audience-text" style={{marginTop: "20px"}}>
          <h1>For</h1>
          <h1 onClick={() => this.changeName('./imgs/designers.svg', '0')}
              className="talent"
              style={{color: this.state.selectedNum == 0 ? "#474448" : "#E7E7E7"}}>designers.</h1>
          <h1 onClick={() => this.changeName('./imgs/coders.svg', '1')}
              className="talent"
              style={{color: this.state.selectedNum == 1 ? "#474448" : "#E7E7E7"}}>engineers.</h1>
          <h1 onClick={() => this.changeName('./imgs/creatives.svg', '2')}
              className="talent"
              style={{color: this.state.selectedNum == 2 ? "#474448" : "#E7E7E7"}}>creatives.</h1>
            <h1 onClick={() => this.changeName('./imgs/analysts.svg', '3')}
                  className="talent"
                  style={{color: this.state.selectedNum == 3 ? "#474448" : "#E7E7E7"}}>analysts.</h1>
        </div>
        <div className="browser">

          <div className="flex-column">

            <p className="typing">{typingText[this.state.selectedNum][0]}</p>
            <p className="typing">{typingText[this.state.selectedNum][1]}</p>
            <p className="typing">{typingText[this.state.selectedNum][2]}</p>
            <p className="typing">{typingText[this.state.selectedNum][3]}</p>
            <p className="typing">{typingText[this.state.selectedNum][4]}</p>
            <p className="typing">{typingText[this.state.selectedNum][5]}</p>
            <p className="typing">{typingText[this.state.selectedNum][6]}</p>

          </div>


          <img src={require(`${this.state.selectedName}`)}
            className="typing-image"/>
        </div>
      </div>

      <div className="cta flex-column center" style={{backgroundColor: "#f5f5f5", padding: "150px 10%"}}>
        <h1>For everyone.</h1>
        <h3 style={{textAlign: "center"}}>We're hard at work bringing Stint to life – <br/>be the first to know when we launch.</h3>
        <div onClick={this.handleButtonClick}><Button text="Join the revolution" margin="50px"/></div>
      </div>

      </div>

    )
  }
}

export default Homepage;

// <Typist cursor={{ show: false }}>
