/** @jsx jsx **/
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { jsx } from "@emotion/core";
import { form } from "./style";

import Loading from "./Loading";
import GoogleButton from "./GoogleButton";

export class Component extends React.Component {
  state = { message: "", loading: false };

  onError = ({ message }) => this.setState({ message, loading: false });

  onFormSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.setState({ loading: true });
    this.props.loginUser({ email, password, onError: this.onError });
  };

  loginWithProvider = (provider) => {
    this.setState({ loading: true });
    this.props.loginUser({ provider, onError: this.onError });
  };

  render() {
    const { loading, message } = this.state;

    return (
      <form onSubmit={this.onFormSubmit} css={form}>
        <h2>LOGIN</h2>
        <input type="email" ref="email" placeholder="Email" />
        <input type="password" ref="password" placeholder="Password" />
        {!loading ? (
          <Fragment>
            <button type="submit">LOGIN</button>
            {message && <div className="warning">{message}</div>}
          </Fragment>
        ) : (
          <Loading
            element={<button></button>}
            color="white"
            width="20%"
            height={"auto"}
          />
        )}
        <GoogleButton
          onClick={() => {
            !loading && this.loginWithProvider("google");
          }}
        />
        <Link to="/reset">Forgot password? Reset</Link>
        <Link to="/register">Create an account</Link>
      </form>
    );
  }
}

function mapStateToProps(state, props) {
  const { firebase, onFinish } = props;
  return {
    loginUser: async ({ email, password, provider, onError }) => {
      try {
        await firebase.login(provider ? { provider } : { email, password });
        (await onFinish) && onFinish();
      } catch (err) {
        await onError(err);
      }
    },
  };
}

export default compose(firebaseConnect(), connect(mapStateToProps))(Component);
