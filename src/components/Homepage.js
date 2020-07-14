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
import {getYoutubeInfo} from "../api/youtube"
import { Link } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
// import { TiMediaPlayReverse, TiMediaPlay } from "react-icons/ti";

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
    this.props.analytics.logEvent("screen_view")
    let cookies = localStorage.getItem("cookies")
    this.setState({
      cookies: cookies
    })
    document.title = 'Stint - Student freelancing at your fingertips.';
  }

  handleCookiesClick = () => {
    localStorage.setItem("cookies", true)
    this.setState({
      cookies: true
    })
  }

  onError = ({ message }) => this.setState({ message, loading: false });

  handleButtonClick = async (event) => {
    event.preventDefault()
    let temp = this.state.modal;
    this.setState({
      modal: !temp
    });
  }

  loginWithProvider = async (provider) => {
    this.setState({ loading: true });

    // TODO: Get rid of this check, as homepage is protected by publicroute, so publicroute will redirect already if you're logged in anyways
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

      {this.state.cookies ? null :
        <div className="cookies">
          <TiTimes className="modal-x" onClick={this.handleCookiesClick} style={{top: "50%", transform: "translateY(-50%)", right: "20px"}}/>
          <div className="subtitle" style={{marginRight: "20px"}}>By continuing to use our site, you are agreeing to our <Link to="/privacy-policy">Privacy Policy</Link>. We also use cookies on our site to give you the best user experience. <span className="nobreak-comp">Learn more about the cookies we use <Link to="/privacy-policy">here</Link>.</span></div>
        </div>
      }

      <div className="modal" style={{display: this.state.modal ? 'flex' : 'none'}}>
        <TiTimes className="modal-x" onClick={this.handleButtonClick}/>
        <p style={{textAlign: "center", color: "white", textWrap: "balance"}}>Be seen by companies before your coffee is brewed (or your Java compiled 🤓)</p>
        <br/>
        <GoogleButton
          onClick={() => {
            !loading && this.loginWithProvider("google");
          }}
        />
        <br/>
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
         <button style={{marginTop: "50px"}} className="button" onClick={this.handleButtonClick}>Let's go 😎</button>
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
              <p>Create your account and build a profile that highlights your skills. Don’t worry if you think you don’t have enough to show – our companies are looking for a wide range of skills, from managing social media to designing web pages.</p>
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
        <h2 style={{marginTop: "75px", color: "#474448", textAlign: "center", marginBottom: "50px"}}>Stint is the practical solution for companies and students to achieve their goals.</h2>
          <CarouselProvider
          naturalSlideWidth={400}
          naturalSlideHeight={200}
          isIntrinsicHeight={true}
          totalSlides={4}
          step={1}
          infinite={true}
          visibleSlides={1}
          isPlaying={true}
          interval={5000}
          className="homepage-carousel">
          <div className="homepage-carousel-container">
            <Slider className="homepage-slider-container">
              <Slide index={0} className="homepage-slide-container">
                <div className="homepage-slide">
                  <h3>A local flower boutique wants to update its old website to appeal to younger audiences. They hire a student designer to create a brand book and 3 new looks for the site.</h3>
                </div>
              </Slide>
              <Slide index={1} className="homepage-slide-container">
                <div className="homepage-slide">
                  <h3>A startup company is creating a short video for marketing purposes. They hire one student to transform their film clips into a video and another student to perform a voiceover.</h3>
                </div>
              </Slide>
              <Slide index={2} className="homepage-slide-container">
                <div className="homepage-slide">
                  <h3>A new startup needs to build a landing page, but they have endless other tasks to manage. They hire a student front-end engineer to quickly build a working site from scratch.</h3>
                </div>
              </Slide>
              <Slide index={3} className="homepage-slide-container">
                <div className="homepage-slide">
                  <h3>A local bakery just added online ordering to their website and wants to see if this has increased site traffic. They hire an analytics student to track site activity and growth.</h3>
                </div>
              </Slide>
            </Slider>
            <DotGroup className="dot-group"/>
            </div>

        </CarouselProvider>

        <div className="flex-column center">
          <p style={{color: "#474448", margin: '100px 0 0 0', textAlign: "center", fontWeight: "bold"}}>Stint is trusted and used by companies empowering students.</p>
          <div className="flex-row center unis">
            <a href="https://vivforyourv.com/" target="_blank"><img src={require('./imgs/companies/viv.png')} className="example-company-square"/></a>
            <a href="https://www.givecard.io/" target="_blank"><img src={require('./imgs/companies/givecard.png')} className="example-company-rect"/></a>
            <a href="https://ourpet.app/" target="_blank"><img src={require('./imgs/companies/ourpet.png')} className="example-company-square"/></a>
          </div>
        </div>

      </div>


      <div className="cta flex-column center" style={{padding: "150px 10%", backgroundColor: "#f5f5f5"}}>
        <h1 style={{textAlign: "center"}}>Join our community <br/>of do-ers and <span className="nobreak">go-getters.</span></h1>
        <h3 style={{textAlign: "center"}}>We brought Stint to life inspired by you. Now give it a try and see if you dig it.</h3>
        <button style={{marginTop: "50px"}} className="button" onClick={this.handleButtonClick}>Let's grow 🌱</button>
      </div>

      <Footer/>

      </div>

    )
  }
}

function mapStateToProps(state, props) {
  const { firebase, history } = props;
  return {
    loginUser: async ({ provider, onError }) => {
      try {
        await firebase.login({ provider: provider, type: "popup" })
          .then(() => history.push("/this-is-me"));
      } catch (err) {
         onError(err)
      }
    },
    isLoggedIn: state.firebase.auth.uid ? true : false,
    analytics: firebase.analytics()
  };
}

export default compose(firebaseConnect(), withRouter, connect(mapStateToProps))(Homepage);
