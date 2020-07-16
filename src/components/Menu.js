import React from "react";
import logo from "./imgs/logo.png";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { slide as Burger } from "react-burger-menu";

import {
  HOMEPAGE_PATH,
  COMPANY_PATH,
  ABOUT_PATH,
  PROFILE_VIEW_PATH,
} from "../constants/ROUTING_CONSTANTS";

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div
        className="menu flex-row"
        style={{ justifyContent: "space-between" }}
      >
        <a href={HOMEPAGE_PATH} className="flex-row center logo-container">
          <img src={logo} className="logo-img" />
          <div className="logo">Stint</div>
        </a>

        <div
          className="flex-row menu-desktop"
          style={{ alignItems: "center", justifyContent: "flex-end" }}
        >
          <NavLink
            to={COMPANY_PATH}
            className="menu-item"
            activeClassName="active-item"
          >
            For Companies
          </NavLink>
          <NavLink
            to={ABOUT_PATH}
            className="menu-item"
            activeClassName="active-item"
          >
            Our Mission
          </NavLink>
          {this.props.profilePic ? (
            <div className="menu-profile flex-row">
              <Link to={PROFILE_VIEW_PATH}>
                <img src={this.props.profilePic} className="menu-propic-solo" />
              </Link>
              <div class="menu-profile-dropdown">
                <Link to={PROFILE_VIEW_PATH}>My Profile</Link>
                <div onClick={this.props.logoutUser} className="sign-out">
                  Sign Out
                </div>
              </div>
            </div>
          ) : this.props.isLoggedIn ? (
            <div className="menu-profile flex-row">
              <Link to={PROFILE_VIEW_PATH}>
                <div
                  className="menu-propic-solo"
                  style={{ backgroundColor: "#f5f5f5" }}
                ></div>
              </Link>
            </div>
          ) : null}
        </div>
        <Burger right>
          {this.props.firstName ? (
            <div
              className="flex-column center"
              style={{ marginBottom: "75px" }}
            >
              <Link to={PROFILE_VIEW_PATH}>
                <img src={this.props.profilePic} className="menu-propic" />
              </Link>
              <div className="menu-name">
                {this.props.firstName.split(" ")[0]}
              </div>
              <Link to={PROFILE_VIEW_PATH} className="menu-burger-profile">
                My Profile
              </Link>
            </div>
          ) : null}

          <NavLink to={COMPANY_PATH} activeClassName="menu-item-burger">
            For Companies
          </NavLink>
          <NavLink to={ABOUT_PATH} activeClassName="menu-item-burger">
            Our Mission
          </NavLink>
          <div onClick={this.props.logoutUser} className="sign-out-burger">
            Sign Out
          </div>
        </Burger>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { firebase } = props;
  return {
    isLoggedIn: state.firebase.auth.uid ? true : false,
    logoutUser: firebase.logout,
    profilePic: state.firebase.auth.photoURL,
    firstName: state.firebase.auth.displayName,
  };
}

export default compose(firebaseConnect(), connect(mapStateToProps))(Menu);

// {this.props.isLoggedIn
//   ? <button className="button" onClick={this.props.logoutUser} style={{marginLeft: "10px"}}>Sign Out</button>
//   : null}
