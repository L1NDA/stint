import React from 'react';
import './company.css';
import logo from './imgs/logo.png'
import companyImage from './imgs/company.svg'
import Button from './Button.js'

import app from 'firebase/app';
import 'firebase/database';
import firebase from '../firebase';

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
        <img src={companyImage} className="homepage-image"/>
        <div className="company-text">
          <h1>Access student talent anywhere, anytime.</h1>
          <h3>Experience an easier way to find immediate student hires for your company tasks.</h3>
          <div onClick={this.handleButtonClick}><Button text="Join our beta" margin="50px"/></div>
        </div>
      </div>

      <div className="flex-column center padding company-2">


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

export default Company;
