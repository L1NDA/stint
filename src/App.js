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

function App({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        <Route path="/(|this-is-me)" component={Auth} />
        <Route path="/hire" component={Company} />
        <Route path="/our-mission" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
