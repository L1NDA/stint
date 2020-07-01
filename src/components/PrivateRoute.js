import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import get from "lodash/get";

const Private = ({ component: Component, ...rest }) => {
  const isLoggedIn = rest.isLoggedIn;
  const pathname = get(rest, "location.state.from.pathname");

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} {...rest} oldPath={rest.location.pathname} />
        ) : (
          <Redirect
            to={{
              pathname: pathname || "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Public = ({ component: Component, ...rest }) => {
  const isLoggedIn = rest.isLoggedIn;
  const pathname = get(rest, "location.state.from.pathname");

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: pathname || "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function mapStateToProps(state, props) {
  return {
    isLoggedIn: state.firebase.auth.uid ? true : false,
  };
}

export const PrivateRoute = connect(mapStateToProps)(Private);
export const PublicRoute = connect(mapStateToProps)(Public);
export default connect(mapStateToProps)(Private);
