import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage.js'
import Company from './components/Company.js'
import About from './components/About.js'
import ProfileCreation from './components/ProfileCreation.js'
const { getSignedInUser, authUi, authUiConfig, linkedinCallback, signOutFreelancer } = require('./api/auth')



function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/hire' component={Company}/>
          <Route exact path='/our-mission' component={About}/>
          <Route path='/login=TRUE' component={ProfileCreation}/>
          <Route path='/auth/linkedin/callback'>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
