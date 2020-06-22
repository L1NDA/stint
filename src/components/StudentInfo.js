import React from 'react';
import {Colleges, Majors, Cities} from './LoginDropdowns.js'
import Select from './Select.js'
import Autocomplete from './Autocomplete.js'
import firebaseConfig from '../config.js'

const Year = [ "(select year*)", "freshman", "sophomore", "junior", "senior"]

const State = ["(select state*)", "Outside US", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

class StudentInfo extends React.Component {

  constructor(){
    super();
    this.state = {}
  }

  handleChange = (stateName, content, index = null, finished = null) => {
    this.props.saveToParent(stateName, content, index)
    if (stateName === "major" || stateName === "major2" || stateName==="minor" || stateName==="minor2") {
      this.setState({
        [stateName]: true
      })
    }
  }

  render() {
      return (

      <form className="student-dialogue" autocomplete="off">
        <div className="student-dialogue-block">

        <h3>I am a <Select items={Year} name="year" saveData={this.handleChange}/>
        at <Autocomplete
             options={Colleges}
             name="colleges"
             placeholder="(insert college*)"
             saveData={this.handleChange}
             required={true}/>.</h3>
        <h3>I'm majoring in <Autocomplete
                              options={Majors}
                              name="major"
                              index="0"
                              placeholder="(insert major*)"
                              saveData={this.handleChange}
                              required={true}
                              optionalParent/>
          {this.state.major ?
            <span className="optional-chunk" style={{filter: this.state.major2 ? "opacity(1)" : null}}>and <Autocomplete
                                  className="optional-input"
                                  options={Majors}
                                  name="major2"
                                  index="1"
                                  placeholder="(insert second major)"
                                  saveData={this.handleChange}
                                  required={false}
                                  /> </span>
              : null}
                          and minoring in
        <Autocomplete
          options={Majors}
          name="minor"
          placeholder="(insert minor)"
          saveData={this.handleChange}
          index="0"
          required={false}
          optionalParent/>
          {this.state.minor ?
            <span className="optional-chunk" style={{filter: this.state.minor2 ? "opacity(1)" : null}}>and <Autocomplete
                                  className="optional-input"
                                  options={Majors}
                                  name="minor2"
                                  index="1"
                                  placeholder="(insert second minor)"
                                  saveData={this.handleChange}
                                  required={false}
                                  /> </span>
              : null}.</h3>

        <h3>I’m currently residing in
            <Autocomplete
              options={Cities}
              name="city"
              placeholder="(insert city*)"
              saveData={this.handleChange}
              required={true}/>,
            <Select items={State} name="state" saveData={this.handleChange} saveData={this.handleChange}/>.</h3>
        </div>
        <div className="hline"></div>
        <div className="student-dialogue-block">
          <h3>My most recent work experience was as a(n)
            <Autocomplete
              options={[]}
              name="role-1"
              placeholder="(role*)"
              index="0"
              saveData={this.handleChange}
              required={true}/>
            at <Autocomplete
                options={[]}
                name="company-1"
                placeholder="(company*)"
                index="0"
                saveData={this.handleChange}
                required={true}/>.</h3>
          <h3>Another recent work experience was as a(n)
          <Autocomplete options={[]} name="role-2" placeholder="(role)" index="1" saveData={this.handleChange}/>
          at <Autocomplete options={[]} name="company-2" placeholder="(company)" index="1" saveData={this.handleChange}/>.</h3>
          <h3>Another recent work experience was as a(n)
          <Autocomplete options={[]} name="role-3" placeholder="(role)" index="2" saveData={this.handleChange}/>
          at <Autocomplete options={[]} name="company-3" placeholder="(company)" index="2" saveData={this.handleChange}/>.</h3>
        </div>
        <div className="hline"></div>
        <div className="student-dialogue-block">
          <h3>I’ve been most recently involved in
          <Autocomplete
          options={[]}
          name="ec-1"
          placeholder="(organization*)"
          index="0"
          saveData={this.handleChange}
          required={true}/> as a(n)
          <Autocomplete
          options={[]}
          name="ecrole-1"
          placeholder="(role*)"
          index="0"
          saveData={this.handleChange}
          required={true}/>.</h3>
          <h3>I’ve also been involved in
          <Autocomplete options={[]} name="ec-2" placeholder="(organization)" index="1" saveData={this.handleChange}/> as a(n) <Autocomplete options={[]} name="ecrole-2" placeholder="(role)" index="1" saveData={this.handleChange}/>.</h3>
          <h3>I’ve also been involved in
          <Autocomplete options={[]} name="ec-2" placeholder="(organization)" index="2" saveData={this.handleChange}/> as a(n) <Autocomplete options={[]} name="ecrole-2" placeholder="(role)" index="2" saveData={this.handleChange}/>.</h3>
        </div>
      </form>
    )}
  }

  export default StudentInfo;
