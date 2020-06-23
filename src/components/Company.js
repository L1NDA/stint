import React from 'react';
import './style/company.css';
import Menu from './Menu.js';
import Footer from './Footer.js'
import companyImage from './imgs/company.svg'
import tri1 from './imgs/tri-1.svg'
import tri2 from './imgs/tri-2.svg'
import tri3 from './imgs/tri-3.svg'
import Button from './Button.js'
import app from 'firebase/app';
import 'firebase/database';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { TiMediaPlayReverse, TiMediaPlay } from "react-icons/ti";
import { debounce } from 'lodash'

class Company extends React.Component {

  constructor(){
    super();
    this.state = {
      screenWidth: null
    }
  }

  updateWindowDimensions = debounce(() => {
    this.setState({
      screenWidth: window.innerWidth
    })
  }, 300);

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions)
  }

  render() {

    return (
      <div className="container">

      <Menu/>

      <div className="flex-row center padding homepage-1" style={{paddingBottom: "100px"}}>
        <div className="company-text">
          <h1>Access student talent anywhere, anytime.</h1>
          <h3>Experience an easier way to find immediate student hires for your company tasks.</h3>
          <Button text="Join our beta" style={{marginTop: "50px"}} type="company"/>
        </div>
        <img src={companyImage} className="homepage-image company-image"/>
      </div>

      <div className="flex-column center padding company-2">
        <div className="tri flex-row">
          <img src={tri1} className="tri-image"/>
          <div className="tri-text">
            <div className="tri-title">Hire within days, not months.</div>
            <h3>We’ve streamlined the hiring process so that you’ll be in touch with student talent within 24 hours. Don’t waste any more time with unnecessary procedures.</h3>
          </div>
        </div>

        <div className="tri flex-row reverse">
          <div className="tri-text">
            <div className="tri-title">Low risk, high reward.</div>
            <h3>Unsatisfied with how the project is rolling out? No worries. We’ll fully refund any stints cancelled before the end of the project’s first quarter.</h3>
            <div className="stipulation">*for jobs requiring a total of more than 20 hours or four days.</div>
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

      <div className="flex-column center carousel-section" style={{backgroundColor: "#f5f5f5", padding: "75px 10%"}}>
        <h3>Stint taps into the overlooked talent pool of college students.</h3>
          <CarouselProvider
          naturalSlideWidth={345}
          naturalSlideHeight={345}
          isIntrinsicHeight={true}
          totalSlides={7}
          step={this.state.screenWidth > 925 ? 2 : 1}
          infinite={true}
          visibleSlides={this.state.screenWidth > 925 ? 3 : 1}
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
                  <img src={require('./imgs/past-stints/3.svg')} className="company-slide-img"></img>
                  <h2 style={{textAlign: "center"}}>Video & Photo</h2>
                  <div className="company-p">Create digital media material for marketing</div>
                </div>
              </Slide>
              <Slide index={4} className="company-slide-container">
                <div className="company-slide">
                  <img src={require('./imgs/past-stints/4.svg')} className="company-slide-img"></img>
                  <h2 style={{textAlign: "center"}}>Branding & Design</h2>
                  <div className="company-p">Create your company brand</div>
                </div>
              </Slide>
              <Slide index={5} className="company-slide-container">
                <div className="company-slide">
                  <img src={require('./imgs/past-stints/5.svg')} className="company-slide-img"></img>
                  <h2 style={{textAlign: "center"}}>Social Media</h2>
                  <div className="company-p">Engage your audience and increase your following</div>
                </div>
              </Slide>
              <Slide index={6} className="company-slide-container">
                <div className="company-slide">
                  <img src={require('./imgs/past-stints/6.svg')} className="company-slide-img"></img>
                  <h2 style={{textAlign: "center"}}>Data Visualization</h2>
                  <div className="company-p">Present numerical data in a digestible way</div>
                </div>
              </Slide>
            </Slider>
            </div>
            <ButtonNext className="button-next"><TiMediaPlay/></ButtonNext>
        </CarouselProvider>
        <div className="flex-row center unis">
          <img src={require('./imgs/unis/bu.png')} className="uni"/>
          <img src={require('./imgs/unis/harvard.png')} className="uni"/>
          <img src={require('./imgs/unis/bc.png')} className="uni"/>
        </div>
      </div>

      <div className="flex-column center company-cta">
        <h1>Hire now.</h1>
        <h3 style={{textAlign: "center"}}>Got a task you need extra hands for? Don’t have the resources to recruit for full-time? No problem! <br/><br/>
          Connect with talented and capable students who are itching to put their time and skills to good use.</h3>
        <Button text="Join our beta" style={{marginTop: "50px"}} type="company"/>
      </div>

      <Footer/>

      </div>

    )
  }
}

export default Company;
