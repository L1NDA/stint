import React from 'react';
import Select from './Select.js'
import Autocomplete from './Autocomplete.js'
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

class StudentSkillsDropdown extends React.Component {

  constructor(){
    super();
    this.state = {
      details: false
    }
  }

  handleHaves = (stateName, content, index = null) => {
    if (content === "have") {
      this.setState({
        [stateName]: true
      })
    } else {
      this.setState({
        [stateName]: false
      })
    }
  }

  handleChange = (stateName, content, index = null) => {
    // this.props.saveToParent(stateName, content, index)
  }

  handleClick = () => {
    this.setState({
      details: !this.state.details
    })
  }

  render() {
      return (

        <div className="student-dialogue-block">

        <div className="flex-column" className="skills-header" onClick={this.handleClick}>
          <div className="skills-header-row">
            <h3 style={{fontWeight: "bold"}}>{this.props.title}</h3>
            {this.state.details ? <BsChevronUp/> : <BsChevronDown/>}
            <div className="student-skill-status">In Progress</div>
          </div>
          <p style={{color: "#B0B0B0", margin: "0", marginTop: "10px"}}>{this.props.subtitle}</p>
        </div>

        {this.state.details ?
          <div>
            {this.props.content.map((text, index) => {
              return (
                <h3>I <Select
                  items={["have", "do not have"]}
                  name={`${this.props.section}Have${index}`}
                  saveData={this.handleHaves}
                  have="true"/>
                {text}
                {this.state[`${this.props.section}Have${index}`] ?
                <React.Fragment>
                  : <Autocomplete options={[]} name={`${this.props.section}${index}`} placeholder="(insert URL*)" saveData={this.handleChange}/>.
              </React.Fragment> : <React.Fragment>.</React.Fragment>}</h3>
              );
            })}
          </div>
          : null}

        </div>
    )}
  }

  export default StudentSkillsDropdown;
