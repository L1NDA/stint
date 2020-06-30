import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage.js'
import Company from './components/Company.js'
import About from './components/About.js'
import Auth from './components/Auth'
import { Provider } from 'react-redux'
import { store, rrfProps } from './firebase.js'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'

function App() {
  return (
  	<Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
	    <Router>
	        <Switch>
	          <Route path="/(login|register|auth|reset)/" component={Auth} />
	          <Route exact path='/' component={Homepage}/>
	          <Route exact path='/hire' component={Company}/>
	          <Route exact path='/our-mission' component={About}/>
	        </Switch>
	    </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
