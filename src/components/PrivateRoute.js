import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import get from "lodash/get";

class Private extends React.Component {

  async componentDidMount() {
    const { ...rest } = this.props
    const isLoggedIn = await rest.isLoggedIn;
    const pathname = await get(rest, "location.state.from.pathname");
    this.setState({ isLoggedIn: isLoggedIn, pathname: pathname }, () => console.log(this.state))
  }

  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) =>
          this.state.isLoggedIn ? (
            <Component {...props} {...rest} oldPath={this.state.pathname} />
          ) : (
            <Redirect
              to={{
                pathname: this.state.pathname || "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
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
    state: state
  };
}

export const PrivateRoute = connect(mapStateToProps)(Private);
export const PublicRoute = connect(mapStateToProps)(Public);
export default connect(mapStateToProps)(Private);
