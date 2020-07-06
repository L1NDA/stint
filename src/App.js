import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Homepage from './components/Homepage.js'
import Company from './components/Company.js'
import About from './components/About.js'
import Auth from './components/Auth'
import ProfileCreation from './components/ProfileCreation'
import { connect } from "react-redux";

function App({ emailVerified, isLoggedIn }) {
  return (
    <Router>
      <Switch>
        <Route path="/(this-is-me)/" component={Auth} />
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/hire' component={Company}/>
        <Route exact path='/our-mission' component={About}/>
        <Route exact path='/login=true' component={ProfileCreation}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state, props) => {
  
};

export default connect(mapStateToProps)(App);
