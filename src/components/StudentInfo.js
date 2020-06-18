import React from 'react';
import {Colleges, Majors} from './LoginDropdowns.js'
import Select from './Select.js'
import Autocomplete from './Autocomplete.js'
import firebaseConfig from '../config.js'
import PlacesAutocomplete from 'react-places-autocomplete'

const Year = [ "(select year*)", "freshman", "sophomore", "junior", "senior"]

const State = ["(select state*)", "Outside US", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

const searchOptions = {
  types: ["(cities"],
  componentRestrictions: {country: "us"}
}

class StudentInfo extends React.Component {

  constructor(){
    super();
    this.state = {
      continue: false
    }
  }

  render() {
      return (

      <div className="student-dialogue">
        <div className="student-dialogue-block">
        <script src="http://maps.googleapis.com/maps/api/js?key={firebaseConfig.apiKey}&libraries=places" type="text/javascript"></script>
          <h3>I am a <Select items={Year} name="year"/> at
          <Autocomplete options={Colleges} name="colleges" placeholder="(insert college*)"/>.</h3>
          <h3>I'm majoring in <Autocomplete options={Majors} name="majors" placeholder="(insert major*)"/> and minoring in
          <Autocomplete options={Majors} name="minors" placeholder="(insert minor)"/>.</h3>
          <h3>I’m currently residing in
            <Autocomplete options={["Boston", "New York City", "San Francisco"]} name="city" placeholder="(insert city*)"/>,
            <Select items={State} name="state"/>.</h3>
        </div>
        <div className="hline"></div>
        <div className="student-dialogue-block">
          <h3>My most recent work experience was as a(n)
            <Autocomplete options={[]} name="role-1" placeholder="(role*)"/>
            at <Autocomplete options={[]} name="company-1" placeholder="(company*)"/>.</h3>
          <h3>Another recent work experience was as a(n) <Autocomplete options={[]} name="role-2" placeholder="(role)"/> at <Autocomplete options={[]} name="company-2" placeholder="(company)"/>.</h3>
          <h3>Another recent work experience was as a(n) <Autocomplete options={[]} name="role-3" placeholder="(role)"/> at <Autocomplete options={[]} name="company-3" placeholder="(company)"/>.</h3>
        </div>
        <div className="hline"></div>
        <div className="student-dialogue-block">
          <h3>I’ve been most recently involved in <Autocomplete options={[]} name="ec-1" placeholder="(organization*)"/> as a(n) <Autocomplete options={[]} name="ec-role-1" placeholder="(role*)"/>.</h3>
          <h3>I’ve also been involved in <Autocomplete options={[]} name="ec-2" placeholder="(organization)"/> as a(n) <Autocomplete options={[]} name="ec-role-2" placeholder="(role)"/>.</h3>
          <h3>I’ve also been involved in <Autocomplete options={[]} name="ec-2" placeholder="(organization)"/> as a(n) <Autocomplete options={[]} name="ec-role-2" placeholder="(role)"/>.</h3>
        </div>
      </div>
    )}
  }

  export default StudentInfo;
