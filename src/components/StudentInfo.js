import React from 'react';
import {Colleges, Majors, Cities, Roles} from './LoginDropdowns.js'
import Select from './Select.js'
import Autocomplete from './Autocomplete.js'

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
    || stateName==="ecrole3"
    || stateName==="yearcompany1"
    || stateName==="yearcompany2"
    || stateName==="yearcompany3"
    || stateName==="yearec1"
    || stateName==="yearec2"
    || stateName==="yearec3") {
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

      <div className="student-dialogue">
        <div className="student-dialogue-block">

        <h3>I am a <Select items={Year} name="year" saveData={this.handleChange}/>
        at <span className="nobreak"><Autocomplete
             options={Colleges}
             name="colleges"
             placeholder="(insert college*)"
             saveData={this.handleChange}
             required={true}/>.</span></h3>
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
        <span className="nobreak">
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
        : null}.</span></h3>

        <h3>I’m currently residing in
            <Autocomplete
              options={Cities}
              name="city"
              placeholder="(insert city*)"
              saveData={this.handleChange}
              required={true}/>,
            <span className="nobreak">
            <Select items={State} name="state" saveData={this.handleChange} saveData={this.handleChange}/>.
            </span></h3>
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

                name="company1"
                placeholder="(company*)"
                index="0"
                saveData={this.handleChange}
                required={true}
                optionalParent/>
              in <span className="nobreak">
              <Select items={['(insert year*)', '2020', '2019', '2018', '2017', '2016']} name="yearcompany1" index="0" saveData={this.handleChange}/>.</span></h3>
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
            optionalParent
            maxLength="60"/>
          at
          <Autocomplete

            className="optional-input"
            name="company2"
            placeholder="(company)"
            index="1"
            saveData={this.handleChange}
            required={false}
            optionalParent
            maxLength="60"/>
          in
          <span className="nobreak">
          <Select items={['(insert year*)', '2020', '2019', '2018', '2017', '2016']} name="yearcompany2" index="1" saveData={this.handleChange}/>.</span></span></h3> : null}
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

            className="optional-input"
            name="company3"
            placeholder="(company)"
            index="2"
            saveData={this.handleChange}
            required={false}
            maxLength="60"/>
          in
          <span className="nobreak">
          <Select items={['(insert year*)', '2020', '2019', '2018', '2017', '2016']} name="yearcompany2" index="2" saveData={this.handleChange}/>.</span></span></h3> : null}
        </div>
        <div className="hline"></div>
        <div className="student-dialogue-block">
          <h3>I’ve been most recently involved in
          <Autocomplete

          name="ec1"
          placeholder="(organization*)"
          index="0"
          saveData={this.handleChange}
          required={true}
          optionalParent
          maxLength="60"/> as a(n)
          <Autocomplete

          name="ecrole1"
          placeholder="(role*)"
          index="0"
          saveData={this.handleChange}
          required={true}
          optionalParent/>
        in <span className="nobreak">
        <Select items={['(insert year*)', '2020', '2019', '2018', '2017', '2016']} name="yearec1" index="0" saveData={this.handleChange}/>.</span></h3>
        {this.state.ec1 && this.state.ecrole1 ?
        <h3><span className="optional-chunk" style={{filter: this.state.ec2 || this.state.ecrole2 ? "opacity(1)" : null}}>
          I’ve also been involved in
          <Autocomplete

            className="optional-input"
            name="ec2"
            placeholder="(organization)"
            index="1"
            saveData={this.handleChange}
            required={false}
            optionalParent
            maxLength="60"/> as a(n)
          <Autocomplete

            className="optional-input"
            name="ecrole2"
            placeholder="(role)"
            index="1"
            saveData={this.handleChange}
            required={false}
            optionalParent/>
          in <span className="nobreak"><Select items={['(insert year*)', '2020', '2019', '2018', '2017', '2016']} name="yearec2" index="1" saveData={this.handleChange}/>.</span></span></h3> : null}
        {this.state.ec2 && this.state.ecrole2 ?
        <h3>
        <span className="optional-chunk" style={{filter: this.state.ec3 || this.state.ecrole3 ? "opacity(1)" : null}}>
          I’ve also been involved in
          <Autocomplete

            className="optional-input"
            name="ec3"
            placeholder="(organization)"
            index="2"
            saveData={this.handleChange}
            required={false}
            maxLength="60"/> as a(n)
          <Autocomplete

            className="optional-input"
            name="ecrole3"
            placeholder="(role)"
            index="2"
            saveData={this.handleChange}
            required={false}/>
          in <span className="nobreak"><Select items={['(insert year*)', '2020', '2019', '2018', '2017', '2016']} name="yearec3" index="2" saveData={this.handleChange}/>.</span></span></h3> : null}
        </div>
      </div>
    )}
  }

  export default StudentInfo;
