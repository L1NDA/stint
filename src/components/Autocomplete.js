import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';
import axios from 'axios'

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };

  constructor() {
    super();
    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: '',
      focus: false
    };
  }

  // componentDidMount() {
  //   this.setWidth()
  // }

  // setWidth = (text) => {
  //   console.log("text", text)
  //   let hide = document.getElementById(`hide-${this.props.name}`);
  //   let show = document.getElementById(`show-${this.props.name}`);
  //   if (!text) {
  //     hide.textContent = this.props.placeholder;
  //   } else {
  //     hide.textContent = text;
  //   }
  //   console.log("hide", hide)
  //   console.log("offset width", hide.offsetWidth + 5)
  //   let extraWidth = hide.offsetWidth + 5
  //   show.style.width = extraWidth + "px";
  // };

  handleFocus = () => {

      this.setState({
        focus: true
      })
  }

  handleBlur = () => {
    this.setState({
        focus: false
      })

  }

  onChange = (e) => {

    const { options } = this.props;
    const userInput = e.currentTarget.value;
    let filteredOptions = [];

    if (userInput.length > 2) {
      if (this.props.name === "city") {
        console.log('hi')
        filteredOptions = axios.get("http://localhost:5001/stint-landing/us-central1/getCityPredictions", {textInput:userInput})
                            .then(res => {
                              return res
                            })
      }
      else {
      filteredOptions = options.filter(
        (optionName) =>
          optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )};
    }

    // const filteredOptions = options.filter(
    //   (optionName) =>
    //     optionName.toLowerCase().startsWith(userInput.toLowerCase())
    // );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    }, function() {
      if (!this.props.index) {
        this.props.saveData(this.props.name, this.state.userInput)
      } else {
        this.props.saveData(this.props.name, this.state.userInput, this.props.index)
      }

      });

    // this.setWidth(e.currentTarget.value)
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    }, function() {
      if (!this.props.index) {
        this.props.saveData(this.props.name, this.state.userInput)
      } else {
        this.props.saveData(this.props.name, this.state.userInput, this.props.index)
      }

      });
    // this.setWidth(e.currentTarget.innerText)
  };

  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      }, function() {
        if (!this.props.index) {
          this.props.saveData(this.props.name, this.state.userInput)
        } else {
          this.props.saveData(this.props.name, this.state.userInput, this.props.index)
        }

        });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput , focus}
    } = this;
    let optionList;
    if (showOptions && userInput && focus) {
      if (filteredOptions.length) {
        optionList = (
          <div className="ac-dropdown">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active ac-dropdown-item';
              } else {
                className = 'ac-dropdown-item'
              }
              return (
                <div className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </div>
              );
            })}
          </div>
        );
      } else {
        // optionList = (
        //   <div className="no-options">
        //     <em>No Option!</em>
        //   </div>
        // );
      }
    }
    return (
      <span className="autocomplete-container">
          <AutosizeInput
          	name={`show-${this.props.name}`}
            id={`show-${this.props.name}`}
          	value={userInput}
            placeholder={this.props.placeholder}
          	onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className="search-box-container"
            style={{fontFamily: 'Source Sans Pro, sans-serif', fontSize: "24px", fontWeight: "bold"}}
            required={this.props.required}
          />
        {optionList}
      </span>
    );
  }
}

Autocomplete.defaultProps = {
  required: false,
};

export default Autocomplete;

// <input
//   type="text"
//   className="search-box"
//   onChange={onChange}
//   onKeyDown={onKeyDown}
//   value={userInput}
//   id={`show-${this.props.name}`}
//   placeholder={this.props.placeholder}
//   style={{ width: this.state.width }}
// />

// <span id={`hide-${this.props.name}`} className="hide"></span>
