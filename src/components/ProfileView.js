import React from 'react'
import Menu from './Menu.js'
import { connect } from "react-redux"
import './style/my-profile.css'

class ProfileView extends React.Component {

  constructor(){
    super();
    this.state = {
    }
  }

  componentDidMount = () => {

  }

  render() {
      return (

      <div className="container">
        <Menu/>
        <div className="padding flex-row">
          <img src={this.props.photoURL} className="my-profile-img"></img>
          <div>
            <h1>{this.props.displayName}</h1>
            <p>Computer Science (Mind, Brain and Behavior) & Economics (minor)</p>
            <p>Senior @ Harvard University</p>
          </div>

        </div>

      </div>
    )}
  }

function mapStateToProps(state, props) {
  return {
    displayName: state.firebase.auth.displayName,
    photoURL: state.firebase.auth.photoURL,
  };
}

export default connect(mapStateToProps)(ProfileView);
