import React from 'react';
import logo from './imgs/logo.png'
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";


class Menu extends React.Component {

  constructor(){
    super();
    this.state = {
    }
  }

	render() {
		return (
      <div className="menu flex-row" style={{justifyContent: 'space-between'}}>
        <a href="/" className="flex-row center logo-container">
          <img src={logo} className="logo-img"/>
          <div className="logo">Stint</div>
        </a>

        <div>
          <NavLink to="/hire"
                   className="menu-item"
                   activeClassName="active-item">For Companies</NavLink>
           <NavLink to="/our-mission"
                  className="menu-item"
                  activeClassName="active-item">Our Mission</NavLink>
                {this.props.isLoggedIn ? <button className="button" onClick={this.props.logoutUser}>Sign Out</button> : null}
        </div>
      </div>
		)
	}
}

function mapStateToProps(state, props) {
  const { firebase } = props
  return {
    isLoggedIn: state.firebase.auth.uid ? true : false,
    logoutUser: firebase.logout
  };
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Menu);
