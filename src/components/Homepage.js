import React, {useContext} from 'react';
import './style/homepage.css';
import { NavLink } from 'react-router-dom';
import logo from './imgs/logo.png'
import homepageImage from './imgs/homepage.svg'
import Button from './Button.js'
import Menu from './Menu.js'
import Footer from './Footer.js'
import {FaLaptopCode, FaBookReader} from "react-icons/fa";
import {MdBrokenImage} from "react-icons/md";
import {AiFillSchedule} from "react-icons/ai";
import { TiTimes } from "react-icons/ti";
import { getGithubInfo } from "../api/github"
import Collapsible from 'react-collapsible';
import {getInstaInfo} from "../api/instagram"
import {getMediumInfo} from "../api/medium"

import GoogleButton from './Auth/GoogleButton'
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

const axios = require('axios')
const {setCompanyBetaInfo} = require('../api/company')

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

  componentDidMount() {
    console.log(this.props)
    this.props.analytics.logEvent("screen_view")
  }

  onError = ({ message }) => this.setState({ message, loading: false });

  handleButtonClick = async (event) => {
    event.preventDefault()
    let temp = this.state.modal;
    this.setState({
      modal: !temp
    });
  }

  loginWithProvider = async (e, provider) => {
    this.setState({ loading: true });
    if (!this.props.isLoggedIn) {
      this.props.loginUser({ provider, onError: this.onError }, () => this.props.analytics.logEvent("login"))
    }
    else {
      this.props.history.push("/this-is-me")
    }
  };

  render() {
    const {loading} = this.state
    return (
      <div className="homepage">

      <div className="modal" style={{display: this.state.modal ? 'flex' : 'none'}}>
        <TiTimes className="modal-x" onClick={this.handleButtonClick}/>
        <h2 style={{textAlign: "center", color: "white", textWrap: "balance"}}>Be seen by companies before your coffee is brewed (or your Java compiled 🤓)</h2>
        <br/>
        <GoogleButton
          onClick={(e) => {
            !loading && this.loginWithProvider(e, "google");
          }}
        />
      </div>

      <div className="modal-screen"
           style={{display: this.state.modal ? 'block' : 'none'}}
           onClick={this.handleButtonClick}></div>

      <div className="covid">
      In light of COVID-19, we hope to support students and companies in any way we can. If you are a company looking to hire, we’d love
      to&nbsp;<a href="mailto:wearestint@gmail.com" className="url">hear from you.</a>
      </div>

      <Menu/>

      <div className="flex-row center padding homepage-1" style={{paddingBottom: "100px"}}>
       <div className="homepage-text">
         <h1>Get ahead with <span className="nobreak">real work.</span></h1>
         <h3>Connect with companies through virtual <span className="nobreak">short-term projects.</span></h3>
         <button style={{marginTop: "50px"}} className="button" onClick={this.handleButtonClick}>Join our waitlist</button>
       </div>
       <img src={homepageImage} className="homepage-image"/>
     </div>

     <div className="flex-column center" className="one-liner">
        <div className="h1-smaller">Shorter Work Opportunities that <span className="nobreak-comp">Empower You to <span className="nobreak">Always Grow.</span></span></div>
        <h3>We believe in helping you grow professionally at any time. It shouldn’t take months of recruiting for you to finally get the chance to do industry work. You have skills now – so we’ll give you work now.</h3>
      </div>

      <div className="process-container flex-column">
        <h1 style={{textAlign: 'center'}}>How does Stint work?</h1>
        <div className="process">
          <div className="process-line"></div>
          <div className="process-item">
            <div className="process-label">1</div>
            <img src={require('./imgs/process-1.png')} className="process-img"/>
            <div className="process-text">
              <h2>Sign Up</h2>
              <p>Create your account and build a profile that highlights your skills. If you’re worried you don’t have enough to show, try doing our site challenges – they’re an easy way to bulk up your profile.</p>
            </div>
          </div>
          <div className="process-item">
            <div className="process-label">2</div>
            <img src={require('./imgs/process-2.jpg')} className="process-img"/>
            <div className="process-text">
            <h2>Sit Back</h2>
            <p>Continue on with your day-to-day. You’ll get an email when a company has a project for you and wants to connect.</p>
            </div>
          </div>
          <div className="process-item">
            <div className="process-label">3</div>
            <img src={require('./imgs/process-3.png')} className="process-img"/>
            <div className="process-text">
            <h2>Get Stintin’</h2>
            <p>We’ll help you sort out the project logistics. If you decide to take the offer, you can get started right away.</p>
            </div>
          </div>
          <div className="process-item">
            <div className="process-label">4</div>
            <img src={require('./imgs/process-4.jpg')} className="process-img"/>
            <div className="process-text">
            <h2>Circle Back</h2>
            <p>After your stint, leave a review for the company you worked with. They’ll do the same for you. As you complete more stints, reviews will boost your credibility.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-column" style={{backgroundColor: '#f5f5f5'}}>
        <div className="flex-row interstitial">
          <div className="interstitial-item">
            <FaLaptopCode className="interstitial-icon"/>
            <h2 style={{color: "#474448"}}>Build skills.</h2>
            <p>Bootcamps and extracurriculars aren’t the only way to get real-world experience as a full-time student. Gain industry experience, straight from the source.</p>
          </div>

          <div className="interstitial-item">
            <AiFillSchedule className="interstitial-icon"/>
            <h2 style={{color: "#474448"}}>Stay productive.</h2>
            <p>Got extra time on your hands? Do stints and earn some money for those next few burritos – on your own time, at your own pace.</p>
          </div>

          <div className="interstitial-item">
            <MdBrokenImage className='interstitial-icon'/>
            <h2 style={{color: "#474448"}}>Break boundaries.</h2>
            <p>We believe in challenging the status quo. Spend your time doing meaningful work instead of networking. Highlight your skills, not your connections.</p>
          </div>
        </div>

        <div className="flex-column padding center">
          <p style={{color: "#474448", margin: '0'}}><b>Stint is trusted and used by companies empowering students.</b></p>
          <div className="flex-row center unis" style={{padding: "50px 10% 75px 10%"}}>
            <img src={require('./imgs/unis/bu.png')} className="uni"/>
            <img src={require('./imgs/unis/harvard.png')} className="uni"/>
            <img src={require('./imgs/unis/bc.png')} className="uni"/>
          </div>
        </div>
      </div>

      <div className="flex-column center padding process-container">
        <h1 style={{textAlign: "center"}}>Frequently Asked Questions</h1>
        <div className="accordion">
          <Collapsible trigger="What’s a ‘stint’?" transitionTime={200}>
          <p>‘Stints’ are what we call the projects that companies will hire you for through our platform.</p>
          </Collapsible>
          <Collapsible trigger="What skills do I need to join?" transitionTime={200}>
          <p>You can join with whatever skills you have. Currently, we group skill areas into four categories: data analytics, design & branding, content creation & management, and software engineering. <br/><br/>
          Keep in mind that companies have all sorts of needs, so you’re more than likely to find a match for your skills.
          </p>
          </Collapsible>
          <Collapsible trigger="How do I get started?" transitionTime={200}>
          <p>If you’re a student, click the button below to sign up now and make your profile. If you’re a company, <NavLink to="/hire" className="link">visit our companies page</NavLink> to learn more.</p>
          <button style={{marginTop: "50px"}} className="button" onClick={this.handleButtonClick}>Join as student</button>
          </Collapsible>
          <Collapsible trigger="How much will I get paid?" transitionTime={200}>
          <p>You’ll have the chance to negotiate an hourly rate with companies when they reach out to hire you for a stint. We will help facilitate this process to ensure mutual satisfaction for you and the company.</p>
          </Collapsible>
          <Collapsible trigger="When will I get paid?" transitionTime={200}>
          <p>You’ll be able to track your earnings on the platform from the day you start a stint. Actual payment will begin one quarter into the project timeline, at which point we will start transferring payment into your bank account at the agreed hourly rate – including your earnings from the first quarter.<br/><br/>

          Remember that payments may take 2-5 days to appear in your bank account.
          </p>
          </Collapsible>
          <Collapsible trigger="Do I have to be a student to join?" transitionTime={200}>
          <p>Unfortunately, our platform is only for student freelancers as of now. We believe that student talent is often overlooked in the market and hope to empower students to gain industry experience right away.<br/><br/>
          If you are a company looking to hire a student, <NavLink to="/hire" className="link">visit our companies page</NavLink> to get started.</p>
          </Collapsible>
          <Collapsible trigger="Do you offer internships?" transitionTime={200}>
          <p>We created Stint to help students gain industry experience whether or not they are able to land an internship. We’ve eliminated the hassle and time commitment of ‘recruiting’ and provide immediate work opportunities to encourage students to always be growing professionally.</p>
          <button style={{marginTop: "50px"}} className="button" onClick={this.handleButtonClick}>Start your first real work experience with us</button>
          </Collapsible>
        </div>
      </div>


      <div className="cta flex-column center" style={{padding: "150px 10%", backgroundColor: "#f5f5f5"}}>
        <h1 style={{textAlign: "center"}}>Join our community <br/>of do-ers and <span className="nobreak">go-getters.</span></h1>
        <h3 style={{textAlign: "center"}}>We're hard at work bringing Stint to life – <br/>be the first to know when we launch.</h3>
        <button style={{marginTop: "50px"}} className="button" onClick={this.handleButtonClick}>Join our waitlist</button>
      </div>

      <Footer/>

      </div>

    )
  }
}

//window.location.pathname used here because history.push creates maximum depth exceeded error with react rendering
function mapStateToProps(state, props) {
  const { firebase} = props;
  return {
    loginUser: async ({ provider, onError }) => {
      try {
        await firebase.login({ provider: provider, type: "popup" })
          .then(() => window.location.pathname = "/this-is-me");
      } catch (err) {
         onError(err)
      }
    },
    isLoggedIn: state.firebase.auth.uid ? true : false,
    analytics: firebase.analytics()
  };
}

export default compose(firebaseConnect(), withRouter, connect(mapStateToProps))(Homepage);
