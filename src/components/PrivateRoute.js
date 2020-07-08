import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import Loading from './Auth/Loading'
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
          <Loading />
        )
      }
    />
  );
  
};


const Public = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(state => state.firebase.auth.uid ? true : false)
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


export const PrivateRoute = Private;
export const PublicRoute = Public;
export default Private;
