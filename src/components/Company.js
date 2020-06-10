import React from 'react';
import './style/company.css';
import logo from './imgs/logo.png'
import companyImage from './imgs/company.svg'
import tri1 from './imgs/tri-1.svg'
import tri2 from './imgs/tri-2.svg'
import tri3 from './imgs/tri-3.svg'
import Button from './Button.js'
import app from 'firebase/app';
import 'firebase/database';
import firebase from '../firebase';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { TiMediaPlayReverse, TiMediaPlay } from "react-icons/ti";

class Company extends React.Component {

  constructor(){
    super();
    this.state = {

    }
  }

  render() {

    return (
      <div className="container">

      <div className="menu flex-row" style={{justifyContent: 'flex-start'}}>
        <div className="flex-row center">
          <img src={logo} style={{width: '36px'}}/>
          <div className="logo">Stint</div>
        </div>
      </div>

      <div className="flex-row center padding homepage-1" style={{paddingBottom: "100px"}}>
        <div className="company-text">
          <h1>Access student talent anywhere, anytime.</h1>
          <h3>Experience an easier way to find immediate student hires for your company tasks.</h3>
          <div onClick={this.handleButtonClick}><Button text="Join our beta" margin="50px"/></div>
        </div>
        <img src={companyImage} className="homepage-image"/>
      </div>

      <div className="flex-column center padding company-2">
        <div className="tri flex-row">
          <img src={tri1} className="tri-image"/>
          <div className="tri-text">
            <div className="tri-title">Hire within days, not months.</div>
            <h3>We’ve streamlined the hiring process so that you’ll be in touch with student talent within 24 hours. Don’t waste any more time with unnecessary procedures.</h3>
          </div>
        </div>

        <div className="tri flex-row">
          <div className="tri-text">
            <div className="tri-title">Low risk, high reward.</div>
            <h3>Unsatisfied with how the project is rolling out? No worries. We’ll fully refund any stints cancelled before the end of the project’s first quarter.</h3>
            <div style={{fontSize: "14px", fontWeight: "300"}}>*for jobs requiring a total of more than 20 hours or four days.</div>
          </div>
          <img src={tri2} className="tri-image"/>
        </div>

        <div className="tri flex-row">
          <img src={tri3} className="tri-image"/>
          <div className="tri-text">
            <div className="tri-title">Maximize your resources.</div>
            <h3>With our student freelancers, you’ll soon discover that you’ve been missing out on an entire workforce of talent that won’t break your budget. Never splurge on expensive hires again.</h3>
          </div>
        </div>

      </div>

      <div className="flex-column center" style={{backgroundColor: "#f5f5f5", padding: "75px 10%"}}>
        <h3>Our students span 3 different colleges and 5 majors, offering a variety of skills.</h3>
          <CarouselProvider
          naturalSlideWidth={345}
          naturalSlideHeight={345}
          isIntrinsicHeight={true}
          totalSlides={4}
          infinite={true}
          visibleSlides={3}
          className="company-carousel">
          <ButtonBack className="button-back"><TiMediaPlayReverse/></ButtonBack>
          <div className="carousel-container">
            <Slider className="slider-container">
              <Slide index={0} className="company-slide-container">
                <div className="company-slide">
                  <img src={require('./imgs/past-stints/0.svg')} className="company-slide-img"></img>
                  <h2 style={{textAlign: "center"}}>Data Analytics</h2>
                  <div className="company-p">Measure outreach to customers and track company growth.</div>
                </div>
              </Slide>
              <Slide index={1} className="company-slide-container">
                <div className="company-slide">
                  <img src={require('./imgs/past-stints/1.svg')} className="company-slide-img"></img>
                  <h2 style={{textAlign: "center"}}>Web Development</h2>
                  <div className="company-p">Build your online platform.</div>
                </div>
              </Slide>
              <Slide index={2} className="company-slide-container">
                <div className="company-slide">
                  <img src={require('./imgs/past-stints/2.svg')} className="company-slide-img"></img>
                  <h2 style={{textAlign: "center"}}>Blog Writing</h2>
                  <div className="company-p">Populate your company blog with initial posts to reach customers.</div>
                </div>
              </Slide>
              <Slide index={3} className="company-slide-container">
                <div className="company-slide">
                  <img src={require('./imgs/past-stints/2.svg')} className="company-slide-img"></img>
                  <h2 style={{textAlign: "center"}}>Video Editing</h2>
                  <div className="company-p">Create digital media material for marketing</div>
                </div>
              </Slide>
            </Slider>
            </div>
            <ButtonNext className="button-next"><TiMediaPlay/></ButtonNext>
        </CarouselProvider>
        <div className="flex-row center">
          <img src={require('./imgs/unis/bu.png')} className="uni"/>
          <img src={require('./imgs/unis/harvard.png')} className="uni"/>
          <img src={require('./imgs/unis/bc.png')} className="uni"/>
        </div>
      </div>

      <div className="flex-column center" style={{padding: "150px 30%"}}>
        <h1>Hire now.</h1>
        <h3 style={{textAlign: "center"}}>Got a task you need extra hands for? Don’t have the resources to recruit for full-time? No problem! <br/><br/>
          Connect with talented and capable students who are itching to put their time and skills to good use.</h3>
        <div onClick={this.handleButtonClick}><Button text="Join our beta" margin="50px"/></div>
      </div>

      </div>

    )
  }
}

export default Company;
