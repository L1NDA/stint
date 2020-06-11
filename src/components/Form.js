import React from 'react';
import LinkedinSDK from 'react-linkedin-sdk'
import Button from './Button.js'
import logo from './imgs/logo.png'

const { signOutFreelancer } = require('../api/auth')

class Form extends React.Component {

	render() {
		return (
			<div>
			<button onClick={signOutFreelancer}>Sign Out</button>
		  	</div>
		)
	}
}

export default Form;
