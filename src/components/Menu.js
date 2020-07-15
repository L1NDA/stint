import React from 'react';
import logo from './imgs/logo.png'
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { slide as Burger } from 'react-burger-menu'

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

        <div className="flex-row menu-desktop" style={{alignItems: 'center', justifyContent: 'flex-end'}}>
          <NavLink to="/hire"
                   className="menu-item"
                   activeClassName="active-item">For Companies</NavLink>
           <NavLink to="/our-mission"
                  className="menu-item"
                  activeClassName="active-item">Our Mission</NavLink>
          {this.props.profilePic
            ?
              <div className="menu-profile flex-row">
                <Link to="/my-profile"><img src={this.props.profilePic} className="menu-propic-solo"/></Link>
                  <div class="menu-profile-dropdown">
                    <Link to="/my-profile">My Profile</Link>
                    <div onClick={this.props.logoutUser} className="sign-out">Sign Out</div>
                  </div>
              </div>
            : this.props.isLoggedIn ?
              <div className="menu-profile flex-row">
                <Link to="/my-profile"><div className="menu-propic-solo" style={{backgroundColor: "#f5f5f5"}}></div></Link>
              </div>
            : null}
        </div>
        <Burger right>
          {this.props.firstName ?
            <div className="flex-column center" style={{marginBottom: "75px"}}>
            <Link to="/my-profile"><img src={this.props.profilePic} className="menu-propic"/></Link>
            <div className="menu-name">{this.props.firstName.split(' ')[0]}</div>
            <Link to="/my-profile" className="menu-burger-profile">My Profile</Link>
            </div>
            : null
          }

          <NavLink to="/hire"
                   activeClassName="menu-item-burger">For Companies</NavLink>
           <NavLink to="/our-mission"
                  activeClassName="menu-item-burger">Our Mission</NavLink>
          <div onClick={this.props.logoutUser} className="sign-out-burger">Sign Out</div>
        </Burger>
      </div>
		)
	}
}

function mapStateToProps(state, props) {
  const { firebase } = props
  return {
    isLoggedIn: state.firebase.auth.uid ? true : false,
    logoutUser: firebase.logout,
    profilePic: state.firebase.auth.photoURL,
    firstName: state.firebase.auth.displayName,
  };
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Menu);

// {this.props.isLoggedIn
//   ? <button className="button" onClick={this.props.logoutUser} style={{marginLeft: "10px"}}>Sign Out</button>
//   : null}
