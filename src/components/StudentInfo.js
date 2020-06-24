import React from 'react';
import {Colleges, Majors, Cities, Roles} from './LoginDropdowns.js'
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
    if (stateName === "major"
    || stateName === "major2"
    || stateName==="minor"
    || stateName==="minor2"
    || stateName==="role1"
    || stateName==="company1"
    || stateName==="role2"
    || stateName==="company2"
    || stateName==="role3"
    || stateName==="company3"
    || stateName==="ec1"
    || stateName==="ec2"
    || stateName==="ec3"
    || stateName==="ecrole1"
    || stateName==="ecrole2"
    || stateName==="ecrole3") {
      if (content) {
        this.setState({
          [stateName]: true
        }, console.log(this.state))
      } else {
        this.setState({
          [stateName]: false
        })
      }

    }
  }

  render() {
      return (

      <div className="student-dialogue" autocomplete="off">
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
              options={Roles}
              name="role1"
              placeholder="(role*)"
              index="0"
              saveData={this.handleChange}
              required={true}
              optionalParent/>
            at <Autocomplete
                options={[]}
                name="company1"
                placeholder="(company*)"
                index="0"
                saveData={this.handleChange}
                required={true}
                optionalParent/>.</h3>
          {this.state.role1 && this.state.company1 ?
          <h3><span className="optional-chunk" style={{filter: this.state.role2 || this.state.company2 ? "opacity(1)" : null}}>
          Another recent work experience was as a(n)
          <Autocomplete
            options={Roles}
            className="optional-input"
            name="role2"
            placeholder="(role)"
            index="1"
            saveData={this.handleChange}
            required={false}
            optionalParent/>
          at
          <Autocomplete
            options={[]}
            className="optional-input"
            name="company2"
            placeholder="(company)"
            index="1"
            saveData={this.handleChange}
            required={false}
            optionalParent/>.</span></h3> : null}
          {this.state.role2 && this.state.company2 ?
          <h3><span className="optional-chunk" style={{filter: this.state.role3 || this.state.company3 ? "opacity(1)" : null}}>
          Another recent work experience was as a(n)
          <Autocomplete
            options={Roles}
            className="optional-input"
            name="role3"
            placeholder="(role)"
            index="2"
            saveData={this.handleChange}
            required={false}/>
          at
          <Autocomplete
            options={[]}
            className="optional-input"
            name="company3"
            placeholder="(company)"
            index="2"
            saveData={this.handleChange}
            required={false}/>.</span></h3> : null}
        </div>
        <div className="hline"></div>
        <div className="student-dialogue-block">
          <h3>I’ve been most recently involved in
          <Autocomplete
          options={[]}
          name="ec1"
          placeholder="(organization*)"
          index="0"
          saveData={this.handleChange}
          required={true}
          optionalParent/> as a(n)
          <Autocomplete
          options={[]}
          name="ecrole1"
          placeholder="(role*)"
          index="0"
          saveData={this.handleChange}
          required={true}
          optionalParent/>.</h3>
        {this.state.ec1 && this.state.ecrole1 ?
        <h3><span className="optional-chunk" style={{filter: this.state.ec2 || this.state.ecrole2 ? "opacity(1)" : null}}>
          I’ve also been involved in
          <Autocomplete
            options={[]}
            className="optional-input"
            name="ec2"
            placeholder="(organization)"
            index="1"
            saveData={this.handleChange}
            required={false}
            optionalParent/> as a(n)
          <Autocomplete
            options={[]}
            className="optional-input"
            name="ecrole2"
            placeholder="(role)"
            index="1"
            saveData={this.handleChange}
            required={false}
            optionalParent/>.</span></h3> : null}
        {this.state.ec2 && this.state.ecrole2 ?
        <h3>
        <span className="optional-chunk" style={{filter: this.state.ec3 || this.state.ecrole3 ? "opacity(1)" : null}}>
          I’ve also been involved in
          <Autocomplete
            options={[]}
            className="optional-input"
            name="ec3"
            placeholder="(organization)"
            index="2"
            saveData={this.handleChange}
            required={false}/> as a(n)
          <Autocomplete
            options={[]}
            className="optional-input"
            name="ecrole3"
            placeholder="(role)"
            index="2"
            saveData={this.handleChange}
            required={false}/></span></h3> : null}
        </div>
      </div>
    )}
  }

  export default StudentInfo;
