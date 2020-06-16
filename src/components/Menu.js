import React from 'react';
import logo from './imgs/logo.png'
import { NavLink } from 'react-router-dom';

class Menu extends React.Component {

	render() {
		return (
      <div className="menu flex-row" style={{justifyContent: 'space-between'}}>
        <a href="/" className="flex-row center logo-container">
          <img src={logo} className="logo-img"/>
          <div className="logo">Stint</div>
        </a>

        <div className="flex-row center">
          <NavLink to="/hire"
                   className="menu-item"
                   activeClassName="active-item">For Companies</NavLink>
           <NavLink to="/our-mission"
                  className="menu-item"
                  activeClassName="active-item">Our Mission</NavLink>
        </div>
      </div>
		)
	}
}

export default Menu;
