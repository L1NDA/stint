import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import get from "lodash/get";

const Private = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.firebase.auth)
  const pathname = get(rest, "location.state.from.pathname");

  return (
    <Route
      {...rest}
      render={(props) => 
        isLoaded(auth) ? (
          !isEmpty(auth) ? (
            <Component {...props} {...rest} oldPath={pathname} />
          ) : (
            <Redirect
              to={{
                pathname: pathname || "/",
                state: { from: props.location },
              }}
            />
          )
        ) : (
          <div>Loading...</div>
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
    isLoggedIn: state.firebase.auth.uid,
  };
}

export const PrivateRoute = connect(mapStateToProps)(Private);
export const PublicRoute = connect(mapStateToProps)(Public);
export default connect(mapStateToProps)(Private);
