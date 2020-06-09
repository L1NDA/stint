import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage.js'
import Form from './components/Form.js'
const {linkedinCallback} = require('./api/auth')

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/freelancerInfo' component={Form}/>
          <Route path = '/auth/linkedin/callback'>

          </Route>
        </Switch>
      </Router>
  );
}

export default App;
