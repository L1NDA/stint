import React from 'react';
import Select from './Select.js'
import Autocomplete from './Autocomplete.js'
import Button from './Button.js'
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { debounce } from 'lodash'

const SKILLS = "skills"

class StudentSkillsDropdown extends React.Component {

  constructor(){
    super();
    this.state = {
      details: false,
      [SKILLS]: {}
    }
    this.saveStateDebounced = debounce(this.saveState, 1500);
  }

  componentDidUpdate() {
    if (this.state.details && !this.state.width) {
      this.setWidth();
    }
  }

  setWidth = () => {
    const optionEle = document.getElementById(`hidden-skill-level`);
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

  aggregateAwards = (currState) => {
    let categoryString = this.props.section+"HaveAwardCategory"
    let contentString = this.props.section+"HaveAwardContent"
    if (currState[categoryString]) {
      currState.awardCategories = [currState[categoryString]]
      currState.awardContent = [currState[contentString]]
    }
    if (currState[categoryString + "1"]) {
      currState.awardCategories.push(currState[categoryString + "1"])
      currState.awardContent.push(currState[contentString + "1"])
    }
    if (currState[categoryString]) {
      currState.awardCategories.push(currState[categoryString + "2"])
      currState.awardContent.push(currState[contentString + "2"])
    }
    return currState
  }

  handleSubmit = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    let aggregatedState = await this.aggregateAwards(this.state)
    this.props.handleButton(this.props.section, aggregatedState)
  }

  handleSkillClick = (e, skill, type) => {
    e.stopPropagation();
    let tempLevel = this.state[SKILLS][skill]
    if (tempLevel === undefined) {
      tempLevel = 0
    }
    if (tempLevel && type === 'default') {
      tempLevel = 0
    } else if (type === 'plus') {
      tempLevel += 1
    } else if (type === 'minus') {
      tempLevel -= 1
    } else {
      tempLevel = 2
    }

    let newSkills = {...this.state[SKILLS], [skill]: Math.min(5, Math.max(0,tempLevel))}
    if (tempLevel <= 0) {
      delete newSkills[skill]
    }
    this.setState({
      [SKILLS]: newSkills
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
          <form className="flex-column" onSubmit={this.handleSubmit}>
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
                  : <Autocomplete
                      options={[]}
                      name={`${this.props.section}${index}`}
                      placeholder="(insert URL*)"
                      saveData={this.saveState}
                      required={true}
                      type="url"/>.
              </React.Fragment> : <React.Fragment>.</React.Fragment>}</h3>
              );
            })}
            <div>
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
                    <div className="skill-bar" style={{width: `${this.state[SKILLS][skill] ? this.state[SKILLS][skill] * 20 : 0}%`}}></div>
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
                saveData={this.saveStateDebounced}
                required={true}/>
            </React.Fragment>
            : null}.</h3>

          {this.state[`${this.props.section}HaveAwardContent`] ?
          <span className="optional-chunk" style={{filter: this.state[`${this.props.section}HaveAward1`] ? "opacity(1)" : null}}>
            <h3>I <Select
              items={["have not", "have"]}
              name={`${this.props.section}HaveAward1`}
              saveData={this.handleHaves}
              have="true"/>
            won another relevant&nbsp;

            {this.state[`${this.props.section}HaveAward1`] ?
            <Select
              items={["(insert category*)", "competition", "academic", "other"]}
              name={`${this.props.section}HaveAwardCategory1`}
              saveData={this.saveState}/>
            : null}

            &nbsp;award
            {this.state[`${this.props.section}HaveAward1`] ?
            <React.Fragment>
            : <Autocomplete
                options={[]}
                name={`${this.props.section}HaveAwardContent1`}
                placeholder="(award name*)"
                saveData={this.saveStateDebounced}
                required={true}/>
            </React.Fragment>
            : null}.</h3></span> : null
        }

        {this.state[`${this.props.section}HaveAwardContent1`] ?
        <span className="optional-chunk" style={{filter: this.state[`${this.props.section}HaveAward1`] ? "opacity(1)" : null}}>
          <h3>I <Select
            items={["have not", "have"]}
            name={`${this.props.section}HaveAward2`}
            saveData={this.handleHaves}
            have="true"/>
          won third relevant&nbsp;

          {this.state[`${this.props.section}HaveAward2`] ?
          <Select
            items={["(insert category*)", "competition", "academic", "other"]}
            name={`${this.props.section}HaveAwardCategory2`}
            saveData={this.saveState}/>
          : null}

          &nbsp;award
          {this.state[`${this.props.section}HaveAward2`] ?
          <React.Fragment>
          : <Autocomplete
              options={[]}
              name={`${this.props.section}HaveAwardContent2`}
              placeholder="(award name*)"
              saveData={this.saveState}
              required={true}/>
          </React.Fragment>
          : null}.</h3></span> : null
      }

          <Button
            style={{marginTop: "75px", marginBottom: "50px"}}
            text={`I'm done here – list me under ${this.props.title}.`}
            type='submit'/>

        </form>
          : null}



        </div>
    )}
  }

  export default StudentSkillsDropdown;
