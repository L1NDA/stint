import React from 'react';
import Select from './Select.js'
import Autocomplete from './Autocomplete.js'
import Button from './Button.js'
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

class StudentSkillsDropdown extends React.Component {

  constructor(){
    super();
    this.state = {
      details: false
    }
  }

  componentDidUpdate() {
    if (this.state.details && !this.state.width) {
      this.setWidth();
    }
  }

  setWidth = () => {
    const optionEle = document.getElementById(`hidden-skill-level`);
    console.log(optionEle)
    const width = optionEle.offsetWidth + 5; // padding width or arrows
    this.setState({ width: `${width}px` });
  };

  // For component that needs a function prop

  saveState = (stateName, content, index = null) => {
    this.setState({
      [stateName]: content
    })
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

  // handleChange = (stateName, content, index = null) => {
  //   this.props.handleChange(stateName, content, index)
  // }

  handleChange = (stateName, content, index = null) => {
    this.props.saveEntireState()
  }

  handleClick = () => {
    this.setState({
      details: !this.state.details
    })
  }

  handleSkillClick = (e, skill, type) => {
    e.stopPropagation();
    let tempLevel = this.state[skill]
    if (tempLevel === undefined) {
      tempLevel = 0
    }
    if (tempLevel && type === 'default') {
      this.setState({
        [skill]: 0
      })
    } else if (type === 'plus') {
      this.setState({
        [skill]: tempLevel + 1
      })
    } else if (type === 'minus') {
      this.setState({
        [skill]: tempLevel - 1
      })
    } else {
      this.setState({
        [skill]: 2
      })
    }
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
                  : <Autocomplete options={[]} name={`${this.props.section}${index}`} placeholder="(insert URL*)" saveData={this.saveState}/>.
              </React.Fragment> : <React.Fragment>.</React.Fragment>}</h3>
              );
            })}
            <div style={{margin: "50px 0"}}>
            <p>I have the following skills (optional):</p>
            <div className="skill-container">
              {this.props.skills.map((skill, index) => {
                return (
                  <div className="skill"
                       onClick={(e) => this.handleSkillClick(e, skill, 'default')}
                       style={{ minWidth: this.state.width }}>
                    <span className="skill-name">{skill}</span>
                    <span className="minus" onClick={(e) => this.handleSkillClick(e, skill, 'minus')}>-</span>
                    <span className="skill-level">Skill Level</span>
                    <span className="plus" onClick={(e) => this.handleSkillClick(e, skill, 'plus')}>+</span>
                    <div className="skill-bar" style={{width: `${this.state[skill] * 20}%`}}></div>
                  </div>
                )})}
              <div className="skill" id="hidden-skill-level">Skill Level</div>
            </div>
            </div>

            <h3>I <Select
              items={["have", "have not"]}
              name={`${this.props.section}HaveAward`}
              saveData={this.handleHaves}
              have="true"/>
            won a relevant&nbsp;

            {this.state[`${this.props.section}HaveAward`] ?
            <Select
              items={["(insert category*)", "competition", "academic", "other"]}
              name={`${this.props.section}HaveAwardCategory`}
              saveData={this.saveState}/>
            : null}

            &nbsp;award
            {this.state[`${this.props.section}HaveAward`] ?
            <React.Fragment>
            : <Autocomplete
                options={[]}
                name={`${this.props.section}HaveAwardContent`}
                placeholder="(award name*)"
                saveData={this.saveState}
                required={true}/>
            </React.Fragment>
            : null}.</h3>
          <Button margin="50px" text={`List me under ${this.props.title}!`} onClick={this.props.handleButton(this.props.section, this.state)}/>
          </div>
          : null}



        </div>
    )}
  }

  export default StudentSkillsDropdown;
