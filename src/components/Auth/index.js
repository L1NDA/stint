/** @jsx jsx **/
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { jsx } from "@emotion/core";
import queryString from "query-string";

import ProfileCreation from "../ProfileCreation";
import Homepage from "../Homepage";
import ThankYou from "../ThankYou";
import Loading from "./Loading";
import ProfileView from "../ProfileView";
import ProfileEdit from "../ProfileEdit";

import { PrivateRoute, PublicRoute } from "../PrivateRoute";

import {
  PROFILE_CREATION_PATH,
  THANK_YOU_PATH,
  PROFILE_VIEW_PATH,
  PROFILE_EDIT_PATH,
} from "../../constants/ROUTING_CONSTANTS";

const Auth = ({ location }) => {
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  const { mode } = queryString.parse(location.search);

  return (
    <div className="form">
      <Switch>
        <PrivateRoute
          path={PROFILE_CREATION_PATH}
          component={ProfileCreation}
        />
        <PrivateRoute path={THANK_YOU_PATH} component={ThankYou} />
        <PrivateRoute path={PROFILE_VIEW_PATH} component={ProfileView} />
        <PrivateRoute path={PROFILE_EDIT_PATH} component={ProfileEdit} />
      </Switch>
    </div>
  );
};

export default Auth;
