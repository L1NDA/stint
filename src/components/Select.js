import React from "react";

// https://spectrum.chat/react/general/how-to-make-select-tag-width-auto-based-on-the-option-you-selected~663e9b4e-96d8-4302-a4ff-8eabf097c7c2

class Select extends React.Component {
  constructor(props) {
    super(props);
    let tempSelected;
    if (this.props.selected) {
      tempSelected = this.props.selected;
    } else {
      tempSelected = this.props.items[0];
    }
    this.state = {
      selected: tempSelected,
    };
  }

  componentDidMount() {
    this.setWidth();

    if (this.props.have) {
      this.props.saveData(this.props.name, this.state.selected);
    }
  }

  setWidth = () => {
    const optionEle = document.getElementById(
      `selectedOptionHidden${this.props.name}`
    );
    const width = optionEle.offsetWidth + 5; // padding width or arrows
    this.setState({ width: `${width}px` });
  };

  handleSelect = (e) => {
    this.setState({ selected: e.target.value }, () => {
      this.setWidth();
      if (this.props.index) {
        this.props.saveData(
          this.props.name,
          this.state.selected,
          this.props.index
        );
      } else {
        this.props.saveData(this.props.name, this.state.selected);
      }
    });
  };

  findOption = (items, value) => {
    let foundItem;
    (items || []).map((item, index) => {
      if (item === value) {
        foundItem = item;
      }
    });
    return foundItem;
  };

  render() {
    const items = this.props.items;
    const selectedObj = this.findOption(items, this.state.selected);

    return (
      <React.Fragment>
        <select
          style={{ width: this.state.width }}
          onChange={this.handleSelect}
          value={this.state.selected}
          name={this.props.name}
          className="custom-select"
          required={this.props.required}
        >
          {items.map((item, index) => {
            return !this.props.have && index === 0 ?
              <option key={`option:${item}`} value="">
                {item}
              </option>
            : <option key={`option:${item}`} value={item}>
              {item}
            </option>
          })}
        </select>
        <span
          style={{ visibility: "hidden", position: "absolute", left: "0" }}
          className="custom-select"
          id={`selectedOptionHidden${this.props.name}`}
        >
          {selectedObj}
        </span>
      </React.Fragment>
    );
  }
}

export default Select;
