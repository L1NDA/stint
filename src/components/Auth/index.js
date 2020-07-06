/** @jsx jsx **/
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { jsx } from "@emotion/core";
import queryString from "query-string";

import ProfileCreation from "../ProfileCreation"

import { PrivateRoute, PublicRoute } from "../PrivateRoute";

const Auth = ({ location }) => {
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  const { mode } = queryString.parse(location.search);

  return (
      <div className="form">
        <Switch>
          <PrivateRoute path="/this-is-me" component={ProfileCreation} />
        </Switch>
      </div>
  );
};

export default Auth;
