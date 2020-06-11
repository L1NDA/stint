import React from 'react';
import logo from './imgs/logo.png'

class Menu extends React.Component {

	render() {
		return (
      <div className="menu flex-row" style={{justifyContent: 'flex-start'}}>
        <div className="flex-row center">
          <img src={logo} className="logo-img"/>
          <div className="logo">Stint</div>
        </div>
      </div>
		)
	}
}

export default Menu;
