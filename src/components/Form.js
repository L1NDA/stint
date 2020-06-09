import React from 'react';
import LinkedinSDK from 'react-linkedin-sdk'
import Button from './Button.js'
import logo from './imgs/logo.png'

const {checkAuth} = require('../api/auth')
const {linkedinConfig} = require('../config')

class Form extends React.Component {
	// signedIn = checkAuth()
	
	responseLinkedin = response => {
	  console.log(response)
	  return response
	}

	render() {
		return (
			<div>
			<LinkedinSDK
			    clientId={linkedinConfig.apiId}
			    callBack={this.responseLinkedin}
			    fields=":(id,num-connections,picture-url)"
			    className={'className'}
			    loginButtonText={'Login with Linkedin'}
			    logoutButtonText={'Logout from Linkedin'}
			    buttonType={<Button/>}
			    getOAuthToken
		  	/>
		  	</div>
		)
	}
}

export default Form;
