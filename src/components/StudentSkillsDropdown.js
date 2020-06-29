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

  componentDidMount() {
    console.log(this.state)
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
    console.log("aggregateAwards", currState)
    let categoryString = this.props.section+"HaveAwardCategory"
    let contentString = this.props.section+"HaveAwardContent"
    let providerString = this.props.section+"HaveAwardProvider"
    if (currState[categoryString]) {
      currState.awardCategories = [currState[categoryString]]
      currState.awardContent = [currState[contentString]]
      currState.awardProviders = [currState[providerString]]
    }
    if (currState[categoryString + "1"]) {
      currState.awardCategories.push(currState[categoryString + "1"])
      currState.awardContent.push(currState[contentString + "1"])
      currState.awardProviders.push(currState[providerString + "1"])
    }
    if (currState[categoryString + "2"]) {
      currState.awardCategories.push(currState[categoryString + "2"])
      currState.awardContent.push(currState[contentString + "2"])
      currState.awardProviders.push(currState[providerString + "2"])
    }
    return currState
  }

  handleSubmit = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    let aggregatedState = await this.aggregateAwards(this.state)
    this.props.handleButton(this.props.section, aggregatedState)
    this.setState({
      submitted: true,
      details: false
    })
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
            {this.state.details && !this.state.submitted
              || Object.keys(this.state.skills).length !== 0 && !this.state.submitted
              || this.state[`${this.props.section}HaveAwardContent`] && !this.state.submitted
              ? <div className="student-skill-status" style={{backgroundColor: "#8F8DFF"}}>In Progress</div> : null}
            {this.state.submitted
              ? <div className="student-skill-status" style={{backgroundColor: "#05D9B2"}}>Completed</div> : null}
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
                  saveData={this.saveState}
                  selected={this.state[`${this.props.section}Have${index}`]}
                  have={true}/>
                {text}
                {this.state[`${this.props.section}Have${index}`] === "have" ?
                <React.Fragment>
                  : <Autocomplete

                      name={`${this.props.section}${index}`}
                      placeholder="(insert URL*)"
                      saveData={this.saveState}
                      required={true}
                      val={this.state[`${this.props.section}${index}`]}
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
              saveData={this.saveState}
              selected={this.state[`${this.props.section}HaveAward`]}
              have={true}/>
            won a relevant {this.state[`${this.props.section}HaveAward`] === "have" ?
            <Select
              items={["(insert category*)", "competition", "academic", "other"]}
              name={`${this.props.section}HaveAwardCategory`}
              saveData={this.saveState}
              selected={this.state[`${this.props.section}HaveAwardCategory`]}
              have={true}/>
            : null}

            &nbsp;award
            {this.state[`${this.props.section}HaveAward`] === "have" ?
            <React.Fragment>
            : <Autocomplete

                name={`${this.props.section}HaveAwardContent`}
                placeholder="(award name*)"
                saveData={this.saveStateDebounced}
                val={this.state[`${this.props.section}HaveAwardContent`]}
                required={true}
                maxLength="50"/> from <Autocomplete

                    name={`${this.props.section}HaveAwardProvider`}
                    placeholder="(award provider*)"
                    saveData={this.saveStateDebounced}
                    val={this.state[`${this.props.section}HaveAwardProvider`]}
                    required={true}
                    maxLength="50"/>
            </React.Fragment>
            : null}.</h3>

          {this.state[`${this.props.section}HaveAwardContent`] ?
          <span className="optional-chunk" style={{filter: this.state[`${this.props.section}HaveAward1`] ? "opacity(1)" : null}}>
            <h3>I <Select
              items={["have not", "have"]}
              name={`${this.props.section}HaveAward1`}
              saveData={this.saveState}
              have={true}
              selected={this.state[`${this.props.section}HaveAward1`]}/>
            won another relevant {this.state[`${this.props.section}HaveAward1`] === "have" ?
            <Select
              items={["(insert category*)", "competition", "academic", "other"]}
              name={`${this.props.section}HaveAwardCategory1`}
              saveData={this.saveState}
              selected={this.state[`${this.props.section}HaveAwardCategory1`]}
              have={true}/>
            : null}

            &nbsp;award
            {this.state[`${this.props.section}HaveAward1`] === "have" ?
            <React.Fragment>
            : <Autocomplete

                name={`${this.props.section}HaveAwardContent1`}
                placeholder="(award name*)"
                saveData={this.saveStateDebounced}
                val={this.state[`${this.props.section}HaveAwardContent1`]}
                required={true}
                maxLength="50"/> from <Autocomplete

                    name={`${this.props.section}HaveAwardProvider1`}
                    placeholder="(award provider*)"
                    saveData={this.saveStateDebounced}
                    val={this.state[`${this.props.section}HaveAwardProvider1`]}
                    required={true}
                    maxLength="50"/>
            </React.Fragment>
            : null}.</h3></span> : null
        }

        {this.state[`${this.props.section}HaveAwardContent1`] ?
        <span className="optional-chunk" style={{filter: this.state[`${this.props.section}HaveAward1`] ? "opacity(1)" : null}}>
          <h3>I <Select
            items={["have not", "have"]}
            name={`${this.props.section}HaveAward2`}
            saveData={this.saveState}
            selected={this.state[`${this.props.section}HaveAward2`]}
            have={true}/>
          won third relevant {this.state[`${this.props.section}HaveAward2`] === "have" ?
          <Select
            items={["(insert category*)", "competition", "academic", "other"]}
            name={`${this.props.section}HaveAwardCategory2`}
            saveData={this.saveState}
            selected={this.state[`${this.props.section}HaveAwardCategory2`]}
            have={true}/>
          : null}

          &nbsp;award
          {this.state[`${this.props.section}HaveAward2`] === "have" ?
          <React.Fragment>
          : <Autocomplete

              name={`${this.props.section}HaveAwardContent2`}
              placeholder="(award name*)"
              saveData={this.saveState}
              val={this.state[`${this.props.section}HaveAwardContent2`]}
              required={true}
              maxLength="50"/> from <Autocomplete

                  name={`${this.props.section}HaveAwardProvider2`}
                  placeholder="(award provider*)"
                  saveData={this.saveState}
                  val={this.state[`${this.props.section}HaveAwardProvider2`]}
                  required={true}
                  maxLength="50"/>
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
