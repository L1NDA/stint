import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage.js'
import Company from './components/Company.js'
import About from './components/About.js'
import Auth from './components/Auth'
import { connect } from "react-redux";

function App({ emailVerified, isLoggedIn }) {
  return (
    <Router>
      <Switch>
        <Route path="/(login|register|auth|reset)/" component={Auth} />
        {!emailVerified && isLoggedIn && (
          <Route path="/" render={() => <Redirect to="/auth" />} />
        )}
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/hire' component={Company}/>
        <Route exact path='/our-mission' component={About}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state, props) => {
  const { auth, profile } = state.firebase;

  return {
    emailVerified: auth.emailVerified || profile.emailVerified,
    isLoggedIn: state.firebase.auth.uid ? true : false,
  };
};

export default (App);
