import React from 'react';
import Menu from './Menu.js'
import Footer from './Footer.js'
import GoogleButton from './Auth/GoogleButton'
import { TiTimes } from "react-icons/ti";
import { Link } from 'react-router-dom';

import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { LOGIN_EVENT } from "./constants/ANALYTICS_CONSTANTS"

class FourOhFour extends React.Component {

  constructor(){
    super();
    this.state = {
      modal: false,
    }
  }

  componentDidMount() {
    document.title = 'Uh Oh | Stint';
    console.log(this.props)
  }

  handleButtonClick = (event) => {
    event.preventDefault()
    let temp = this.state.modal;
    this.setState({
      modal: !temp
    });
  }

  onError = ({ message }) => this.setState({ message, loading: false });

  loginWithProvider = async (provider) => {
    this.setState({ loading: true });
    if (!this.props.isLoggedIn) {
      this.props.loginUser({ provider, onError: this.onError }, () => this.props.analytics.logEvent(LOGIN_EVENT))
    }
    else {
      this.props.history.push("/this-is-me")
    }
  };

	render() {
    const {loading} = this.state
		return (
      <div className="container" style={{height: '100vh'}}>
        <Menu/>
        <div className="fof-container">
          <div className="fof">
            <img src={require('./imgs/404.svg')} className="fof-img"/>
            <h2>Well, that’s not good.</h2>
            <h3>While we fix ourselves up, <br/>why don’t you try the buttons below?‍</h3>
              {this.props.isLoggedIn ?
                <Link to="/our-mission" style={{marginTop: "20px"}}><button className="button">About Us</button></Link> :
                <div className="flex-row center" style={{marginTop: "20px"}}>
                  <button className="button" onClick={this.handleButtonClick} style={{marginRight: "20px"}}>Join Stint</button>
                  <Link to="/"><button className="button">Homepage</button></Link>
                    <div className="modal" style={{display: this.state.modal ? 'flex' : 'none'}}>
                      <TiTimes className="modal-x" onClick={this.handleButtonClick}/>
                      <p style={{textAlign: "center", color: "white", textWrap: "balance"}}>Be seen by companies before your coffee is brewed (or your Java compiled 🤓)</p>
                      <br/>
                      <GoogleButton
                        onClick={() => {
                          !loading && this.loginWithProvider("google");
                        }}
                      />
                      <br/>
                    </div>
                    <div className="modal-screen"
                         style={{display: this.state.modal ? 'block' : 'none'}}
                         onClick={this.handleButtonClick}></div>
                </div>}

          </div>
        </div>
        <Footer/>
      </div>
		)
	}
}

function mapStateToProps(state, props) {
  const { firebase } = props
  return {
    loginUser: async ({ provider, onError }) => {
      try {
        await firebase.login({ provider: provider, type: "popup" })
          .then(() => window.location.pathname = "/this-is-me");
      } catch (err) {
         onError(err)
      }
    },
    isLoggedIn: state.firebase.auth.uid ? true : false,
    analytics: firebase.analytics(),
  };
}

export default compose(firebaseConnect(), withRouter, connect(mapStateToProps))(FourOhFour);
