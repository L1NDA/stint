import React from 'react';
import logo from './imgs/logo.png'
import { NavLink } from 'react-router-dom';
import {getSignedInUser, signOutFreelancer} from '../api/auth.js'

class Menu extends React.Component {

  constructor(){
    super();
    this.state = {
    }
  }

  componentDidMount = async () => {
    if (await getSignedInUser()) {
      this.setState({
        signedIn: true
      }, ()=>console.log(this.state.signedIn))
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
                {this.state.signedIn ? <button className="button" onClick={signOutFreelancer}>Sign Out</button> : null}
        </div>
      </div>
		)
	}
}

export default Menu;
