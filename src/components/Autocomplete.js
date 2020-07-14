import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';
import axios from 'axios';
import { debounce } from 'lodash'

var clickedDropdown = false

export class Autocomplete extends Component {
  // static propTypes = {
  //   options: PropTypes.instanceOf(Array).isRequired
  // };

  constructor(props) {
    super(props);
    let tempuserInput;
    if (this.props.val) {
      tempuserInput = this.props.val
    } else {
      tempuserInput = ''
    }
    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: tempuserInput,
      focus: false
    };
    this.finishedTypingDebounced = debounce(this.finishedTyping, 1500);
  }

  componentDidMount() {
    this.setWidth()
  }

  // componentDidUpdate (prevProps, prevState) {
	// 	if (prevState.userInput !== this.state.userInput) {
  //     this.setWidth();
	// 	}
  //
	// }

  setWidth = () => {
    let hide = document.getElementById(`hide-${this.props.name}`);
    if (!this.state.userInput) {
      hide.textContent = this.props.placeholder;
    } else {
      hide.textContent = this.state.userInput;
    }
    this.setState({
      width: hide.offsetWidth + 15
    })
  };

  finishedTyping = () => {
    if (!this.props.index) {
      this.props.saveData(this.props.name, this.state.userInput, null, true)
    } else {
      this.props.saveData(this.props.name, this.state.userInput, this.props.index, true)
    }

  }

  handleFocus = () => {

    // if (this.props.type === 'url' && !this.state.userInput) {
    //   this.setState({
    //     userInput: 'http://'
    //   })
    // }

    if (this.props.options) {
      this.setState({
        focus: true
      })
    }


  }

  handleBlur = () => {

    if (this.props.options) {
      if (clickedDropdown) {
        clickedDropdown = false
      } else {
        this.setState({focus: false});
      }
    }



    // setTimeout(
    //     function() {
    //         this.setState({focus: false});
    //     }
    //     .bind(this),
    //     5000
    // );


  }

  onChange = async (e) => {
    if (this.props.type === 'number') {
      var key = e.keyCode;
      if (key === 32) {
        e.preventDefault();
      }
    }

    const { options } = this.props;
    var userInput = e.currentTarget.value;
    let filteredOptions = [];

    if (this.props.name === "city" || this.props.name === "colleges" ||
    this.props.name.startsWith("minor") ||
    this.props.name.startsWith("major") ||
    this.props.name.startsWith("company") ||
    this.props.name.startsWith("ec") ||
    this.props.name.startsWith("role") ||
    this.props.name.startsWith("company") ||
    this.props.name.includes("HaveAwardContent") ||
    this.props.name.includes("HaveAwardProvider")) {
      var splitStr = userInput.split(' ');
      for (var i = 0; i < splitStr.length; i++) {
        if (splitStr[i].length > 3) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        } else {
          splitStr[i] = splitStr[i]
        }
      }
      // Directly return the joined string
      userInput = splitStr.join(' ');
    }

    if (this.props.options) {
      if (userInput.length > 2) {

        filteredOptions = options.filter(
          (optionName) =>
            optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )

      this.setState({
        activeOption: 0,
        filteredOptions,
        showOptions: true,
      });

    };
    }

    this.setState({
      userInput: userInput
    }, function() {
      this.setWidth();
      if (this.props.optionalParent) {
        this.finishedTypingDebounced()
      } else if (!this.props.index) {
        this.props.saveData(this.props.name, this.state.userInput)
      } else {
        this.props.saveData(this.props.name, this.state.userInput, this.props.index)
      }
    });

    // this.setWidth(e.currentTarget.value)
  };

  onMouseDown = (e) => {
    if (this.props.options) {
      clickedDropdown = true
      this.setState({
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: e.currentTarget.innerText
      }, function() {
        this.setWidth();
        if (!this.props.index) {
          this.props.saveData(this.props.name, this.state.userInput)
        } else if (this.props.optionalParent) {
          this.props.saveData(this.props.name, this.state.userInput, true)
        } else {
          this.props.saveData(this.props.name, this.state.userInput, this.props.index)
        }

        });
    } else {
    }


    // this.setWidth(e.currentTarget.innerText)
  };

  onKeyDown = (e) => {
    if (this.props.options) {
      const { activeOption, filteredOptions } = this.state;

      if (e.keyCode === 13) {
        this.setState({
          activeOption: 0,
          showOptions: false,
          userInput: filteredOptions[activeOption]
        }, function() {
          this.setWidth();
          if (!this.props.index) {
            this.props.saveData(this.props.name, this.state.userInput)
          } else if (this.props.optionalParent) {
            this.props.saveData(this.props.name, this.state.userInput, true)
          }
          else {
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
    }


  };

  // setWidth old
  // setWidth = () => {
  //   const hiddenEle = document.getElementById(`hide-${this.props.name}`);
  //   const width = hiddenEle.offsetWidth + 15; // padding width or arrows
  //   this.setState({ width: `${width}px` });
  // };

  render() {
    const {
      onChange,
      onMouseDown,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput , focus}
    } = this;
    let optionList;
    if (this.props.options && showOptions && userInput && focus) {
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
                <div className={className} key={optionName} onMouseDown={onMouseDown}>
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
        <input
          type="text"
          className="search-box-container"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          id={`show-${this.props.name}`}
          placeholder={this.props.placeholder}
          style={{ width: this.state.width }}
          required={this.props.required}
          type={this.props.type}
          maxLength={this.props.maxLength}
        />
        <div id={`hide-${this.props.name}`} className="hide"></div>
        {this.state.showOptions ? optionList : null}

      </span>
    );
  }
}

Autocomplete.defaultProps = {
  required: false,
};

export default Autocomplete;

// <AutosizeInput
//             name={`show-${this.props.name}`}
//             id={`show-${this.props.name}`}
//             value={userInput}
//             placeholder={this.props.placeholder}
//             onChange={onChange}
//             onKeyDown={onKeyDown}
//             onFocus={this.handleFocus}
//             onBlur={this.handleBlur}
//             className="search-box-container"
//             style={{fontFamily: 'Source Sans Pro, sans-serif', fontSize: "24px", fontWeight: "bold"}}
//             required={this.props.required}
//             type={this.props.type}
//             maxLength={this.props.maxLength}
//           />


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

// <div id={`hide-${this.props.name}`} className="hide" style={{visibility: "visible"}}>{userInput}</div>
