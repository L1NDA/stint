/** @jsx jsx **/
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { jsx } from "@emotion/core";
import queryString from "query-string";

import PageLogin from "./PageLogin";
import PageRegister from "./PageRegister";
import PagePasswordReset from "./PagePasswordReset";
import PageConfirmReset from "./PageConfirmReset";
import PageConfirmEmail from "./PageConfirmEmail";

import { PrivateRoute, PublicRoute } from "../PrivateRoute";

import style from "./style.js";

const Auth = ({ location }) => {
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  const { mode } = queryString.parse(location.search);

  return (
    <div css={style}>
      <div className="gallery">
        <div className="logo">
          Logo
        </div>
      </div>
      <div className="form">
        <Switch>
          <PublicRoute exact path="/login" component={PageLogin} />
          <PublicRoute exact path="/register" component={PageRegister} />
          <PublicRoute exact path="/reset" component={PagePasswordReset} />
          {mode === "verifyEmail" && (
            <Route path="/auth" component={PageConfirmEmail} />
          )}
          {mode === "resetPassword" && (
            <PublicRoute path="/auth" component={PageConfirmReset} />
          )}
          {!mode && <PrivateRoute path="/auth" component={PageConfirmEmail} />}
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
