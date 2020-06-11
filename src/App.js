import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage.js'
import Company from './components/Company.js'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/hire' component={Company}/>
        </Switch>
      </Router>
  );
}

export default App;
