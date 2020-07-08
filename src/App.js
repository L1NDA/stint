import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage.js'
import Company from './components/Company.js'
import About from './components/About.js'
import Auth from './components/Auth'
import ProfileCreation from './components/ProfileCreation'
import ProfileView from './components/ProfileView'

function App({ emailVerified, isLoggedIn }) {
  return (
    <Router>
      <Switch>
        <Route path="/(this-is-me)/" component={Auth} />
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/hire' component={Company}/>
        <Route exact path='/our-mission' component={About}/>
        <Route exact path='/my-profile' component={ProfileView}/>
      </Switch>
    </Router>
  );
}

export default App;
