/** @jsx jsx **/
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { jsx } from "@emotion/core";
import { form } from "./style";

import Loading from "./Loading";
import GoogleButton from "./GoogleButton";

export class Component extends React.Component {
  state = {
    message: "",
    loading: false,
  };

  onError = ({ message }) => this.setState({ message, loading: false });

  onFormSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirmPassword = this.refs["confirm-password"].value;

    this.setState({ loading: true });
    if (password === confirmPassword) {
      this.props.registerUser({ email, password, onError: this.onError });
    } else {
      this.onError({ message: "Passwords do not match" });
    }
  };

  loginWithProvider = (provider) => {
    this.setState({ loading: true });
    this.props.registerUser({ provider, onError: this.onError });
  };

  render() {
    const { loading, message } = this.state;

    return (
      <form onSubmit={this.onFormSubmit} css={form}>
        <h2>SIGN UP</h2>
        <input type="email" ref="email" placeholder="Email" />
        <input type="password" ref="password" placeholder="Password" />
        <input
          type="password"
          ref="confirm-password"
          placeholder="Confirm Password"
        />
        {!loading ? (
          <Fragment>
            <button type="submit">SIGN UP</button>
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
        <div className="terms">
          By signing up you agree to the
          <br />
          <a href={window.location.origin + "/terms"} target="_blank">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href={window.location.origin + "/privacy"} target="_blank">
            Privacy Policy
          </a>
        </div>
        <Link to="/login">Already have an account? Log in</Link>
        <Link to="/reset">Forgot password? Reset</Link>
      </form>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    registerUser: async ({ email, password, provider, onFinish, onError }) => {
      try {
        if (provider) {
          const data = await props.firebase.login({ provider });
          await onFinish(data);
        } else {
          const { createUser, auth } = props.firebase;
          const data = await createUser({ email, password });
          await auth().currentUser.sendEmailVerification();
          await onFinish(data);
        }
      } catch (err) {
        await onError(err);
      }
    },
  };
}

export default compose(firebaseConnect(), connect(mapStateToProps))(Component);
