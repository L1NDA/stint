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

        <NavLink to="/hire"
                 className="menu-item"
                 activeClassName="active-item">For Companies</NavLink>
      </div>
		)
	}
}

export default Menu;
