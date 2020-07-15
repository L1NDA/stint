import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import About from './components/About.js'
import Auth from './components/Auth'
import Company from './components/Company.js'
import FourOhFour from './components/FourOhFour.js'
import Homepage from './components/Homepage.js'
import PrivatePolicy from './components/PrivatePolicy.js'
import ProfileCreation from './components/ProfileCreation'
import ProfileView from './components/ProfileView'
import ThankYou from './components/ThankYou.js'


function App({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/(this-is-me|you-did-it|my-profile)" component={Auth} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/hire" component={Company} />
        <Route exact path="/our-mission" component={About} />
        <Route exact path="/privacy-policy" component={PrivatePolicy} />
        <Route exact path="/profile/:uid" component={ProfileView} />
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  );
}

export default App;
