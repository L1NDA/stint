import React from 'react';
import './style/profile.css';
import Menu from './Menu.js';
import Footer from './Footer.js'
import Button from './Button.js'
import app from 'firebase/app';
import 'firebase/database';

class ProfileCreation extends React.Component {

  constructor(){
    super();
    this.state = {
      continue: false
    }
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

        <div className="student-dialogue">
          <div className="student-dialogue-block">
            <h3>I am a <select name="year">
                          <option value="" selected>select year</option>
                          <option value="freshman">freshman</option>
                          <option value="sophomore">sophomore</option>
                          <option value="junior">junior</option>
                          <option value="senior">senior</option>
                      </select>
                      at (insert college*).</h3>
            <h3>I’m currently residing in (insert city*), (insert state*).</h3>
          </div>
          <div className="hline"></div>
          <div className="student-dialogue-block">
            <h3>My most recent work experience was as a(n) (role) at (company).*</h3>
            <h3>Another recent work experience was as a(n) (role) at (company).</h3>
            <h3>Another recent work experience was as a(n) (role) at (company).</h3>
          </div>
          <div className="hline"></div>
          <div className="student-dialogue-block">
            <h3>I’ve been most recently involved in (organization) as a(n) (role).*</h3>
            <h3>I’ve also been involved in (organization) as a(n) (role).</h3>
            <h3>I’ve also been involved in (organization) as a(n) (role).</h3>
          </div>
        </div>

        <div className={this.state.continue ? "stint-dialogue" : "loading"}>
          <h2>Look at you, out there doing things!</h2>
          <h3>You’re almost there – just let us know which skills you'd like to provide to companies and you’ll have your very own Stint profile.</h3>
        </div>

      </div>

      <Footer/>

      </div>

    )
  }
}

export default ProfileCreation;
