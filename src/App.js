import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import About from "./components/About.js";
import Auth from "./components/Auth";
import Company from "./components/Company.js";
import FourOhFour from "./components/FourOhFour.js";
import Homepage from "./components/Homepage.js";
import PrivatePolicy from "./components/PrivatePolicy.js";
import ProfileCreation from "./components/ProfileCreation";
import ProfileView from "./components/ProfileView";
import ThankYou from "./components/ThankYou.js";

import Routes from "./constants/ROUTING_CONSTANTS";

function App({ isLoggedIn }) {
  let authPath =
    "/(" +
    Routes.PROFILE_CREATION_PATH.substring(1) +
    "|" +
    Routes.THANK_YOU_PATH.substring(1) +
    "|" +
    Routes.PROFILE_VIEW_PATH.substring(1) +
    ")";
  return (
    <Router>
      <Switch>
<<<<<<< HEAD
        <Route exact path="/(this-is-me|you-did-it|my-profile)" component={Auth} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/hire" component={Company} />
        <Route exact path="/our-mission" component={About} />
        <Route exact path="/privacy-policy" component={PrivatePolicy} />
        <Route exact path="/profile/:uid" component={ProfileView} />
=======
        <Route exact path={authPath} component={Auth} />
        <Route exact path={Routes.HOMEPAGE_PATH} component={Homepage} />
        <Route exact path={Routes.COMPANY_PATH} component={Company} />
        <Route exact path={Routes.ABOUT_PATH} component={About} />
        <Route
          exact
          path={Routes.PRIVACY_POLICY_PATH}
          component={PrivatePolicy}
        />
>>>>>>> develop
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  );
}

export default App;
