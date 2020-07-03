/** @jsx jsx **/
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { jsx } from "@emotion/core";
import { form } from "./style";

import Loading from "./Loading";

export class Component extends React.Component {
  state = { message: "", sent: false, loading: false };

  onError = ({ message }) => this.setState({ message, loading: false });

  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const email = this.refs.email.value;
    this.props.sendPasswordResetEmail({
      email,
      onFinish: () => this.setState({ sent: true, loading: false }),
      onError: this.onError,
    });
  };

  render() {
    const { sent, loading, message } = this.state;
    return (
      <form onSubmit={this.onFormSubmit} css={form}>
        <h2>RESET PASSWORD</h2>
        <Fragment>
          <input type="email" ref="email" placeholder="Email" />
          {!loading ? (
            <button type="submit">RESET</button>
          ) : (
            <Loading
              element={<button></button>}
              color="white"
              width="20%"
              height={"auto"}
            />
          )}
          {sent && (
            <div className="alert-message">
              Sent reset link to <b>{this.refs.email.value}</b>! Check your
              email!
            </div>
          )}
          {message && !sent && <div className="warning">{message}</div>}
        </Fragment>
        <Link to="/login">Already have an account? Log in</Link>
        <Link to="/register">Create an account</Link>
      </form>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    sendPasswordResetEmail: async ({ email, onFinish, onError }) => {
      const auth = props.firebase.auth();
      try {
        const data = await auth.sendPasswordResetEmail(email);
        await onFinish(data);
      } catch (err) {
        await onError(err);
      }
    },
  };
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Component);
