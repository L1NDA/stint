import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: ''
  };

  componentDidMount() {
    this.setWidth()
  }

  setWidth = (text) => {
    let hide = document.getElementById(`hide-${this.props.name}`);
    let show = document.getElementById(`show-${this.props.name}`);
    if (!this.state.userInput) {
      hide.textContent = this.props.placeholder;
    } else {
      hide.textContent = text;
    }
    show.style.width = hide.offsetWidth + "px";
  };

  onChange = (e) => {

    const { options } = this.props;
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });

    this.setWidth(e.currentTarget.value)
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
    this.setWidth(e.currentTarget.innerText)
  };

  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
      this.setWidth(filteredOptions[activeOption])
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

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
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
      <React.Fragment>
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            id={`show-${this.props.name}`}
            placeholder={this.props.placeholder}
            style={{ width: this.state.width }}
          />
        <span id={`hide-${this.props.name}`} className="hide"></span>
        {optionList}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
