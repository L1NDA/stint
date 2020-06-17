import React from 'react';
import './style/profile.css';
import Menu from './Menu.js';
import Footer from './Footer.js'
import Button from './Button.js'
import Select from './Select.js'
import Autocomplete from './Autocomplete.js'
import app from 'firebase/app';
import 'firebase/database';

const Year = [ "(select year*)", "freshman", "sophomore", "junior", "senior"]

const State = ["(select state*)", "Outside US", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

class ProfileCreation extends React.Component {

  constructor(){
    super();
    this.state = {
      continue: false
    }
  }

  handleChange = () => {

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
            <h3>I am a <Select items={Year} name="year"/> at
            <Autocomplete options={["BU", "BC", "Harvard"]} name="colleges" placeholder="(insert college*)"/>.</h3>
            <h3>I’m currently residing in
              <Autocomplete options={["Boston", "New York City", "San Francisco"]} name="city" placeholder="(insert city*)"/>,
              <Select items={State} name="state"/>.</h3>
          </div>
          <div className="hline"></div>
          <div className="student-dialogue-block">
            <h3>My most recent work experience was as a(n)
              <Autocomplete options={[]} name="role-1" placeholder="(role*)"/>
              at <Autocomplete options={[]} name="company-1" placeholder="(company*)"/>.</h3>
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
