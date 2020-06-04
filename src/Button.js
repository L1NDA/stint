import React from 'react';
import './index.css';


class Button extends React.Component {

  constructor(){
    super();
    this.state = {

    }
  }

  render() {

    return (
      <div className="button" style={{marginTop: this.props.margin}}>

        {this.props.text}

      </div>


    )
  }
}

export default Button;
