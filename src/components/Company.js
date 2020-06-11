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
      showModal: false,
      company: '',
      email: '',
      categories: '',
      modal: false,
    }
  }

  handleButtonClick = () => {
    let temp = this.state.modal
    this.setState({
      modal: !temp
    })
  }

  onChangeCompany = event => {
    this.setState({ company: event.target.value });
  };

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangeCategories = event => {
    this.setState({ categories: event.target.value });
  };

  guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  handleCheckbox = (item) => {
    this.setState({
      [item]: !(this.state[item])
    })
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

      <div className="modal" style={{display: this.state.modal ? 'block' : 'none'}}>
            <form>
              <div className="flex-column" style={{marginBottom: "20px"}}>
                <input
                  type="text"
                  name="name"
                  placeholder="Company name"
                  className="input"
                  autocomplete="off"
                  onChange={this.onChangeCompany}/>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input"
                  autocomplete="off"
                  onChange={this.onChangeEmail}/>
              </div>

              <h4>Areas of interest</h4>
              <div className="flex-column">
                <div><input type="checkbox"
                       name="analytics"
                       checked={this.state.analytics}
                       onChange={() => this.handleCheckbox("analytics")}/>
                <label for="analytics"> Analytics </label></div>

                <div>
                  <input type="checkbox"
                       name="business"
                       checked={this.state.business}
                       onChange={() => this.handleCheckbox("business")}/>
                <label for="business"> Business </label>
              </div>

              <div><input type="checkbox"
                     name="digitalmarketing"
                     checked={this.state.digitalmarketing}
                     onChange={() => this.handleCheckbox("digitalmarketing")}/>
              <label for="digitalmarketing"> Digital Marketing </label></div>

              <div><input type="checkbox"
                     inline={true}
                     name="engineering"
                     checked={this.state.engineering}
                     onChange={() => this.handleCheckbox("engineering")}/>
              <label for="engineering"> Engineering </label></div>

            <div><input type="checkbox"
                   name="graphicsdesign"
                   checked={this.state.graphicsdesign}
                   onChange={() => this.handleCheckbox("graphicsdesign")}/>
            <label for="graphicsdesign"> Graphics & Design </label>
            </div>

                <div><input type="checkbox"
                       name="videomedia"
                       checked={this.state.videomedia}
                       onChange={() => this.handleCheckbox("videomedia")}/>
                <label for="videomedia"> Video & Media </label></div>

              <div><input type="checkbox"
                     name="writing"
                     checked={this.state.writing}
                     onChange={() => this.handleCheckbox("writing")}/>
              <label for="writing"> Writing </label></div>

              </div>
              <button
                type="submit"
                className="button"
                style={{marginTop: "50px"}}>Join our beta →</button>
            </form>
        </div>
        <div className="modal-screen"
             style={{display: this.state.modal ? 'block' : 'none'}}
             onClick={this.handleButtonClick}></div>

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
          totalSlides={7}
          step={2}
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
