/** @jsx jsx **/
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { jsx } from "@emotion/core";
import queryString from "query-string";
import { form } from "./style";

import Loading from "./Loading";

export class Component extends React.Component {
  state = {
    resent: false,
    loading: false,
    verified: false,
    message: this.props.email ? (
      <span>
        A verification email has been sent to <b>{this.props.email}</b>.
      </span>
    ) : (
      <span>Log in to resend a verification email.</span>
    ),
  };

  async componentDidMount() {
    const { emailVerified, history } = this.props;
    if (emailVerified) history.push("/app");
    this.verifyEmail();
  }

  async componentDidUpdate() {
    const { emailVerified, history } = this.props;
    if (emailVerified) history.push("/app");
  }

  onError = ({ message }) => this.setState({ error: message, loading: false });

  verifyEmail = async () => {
    await this.setState({ loading: true });
    await this.props.verifyEmail({
      onError: this.onError,
      onFinish: () => {
        this.setState({
          loading: false,
          verified: true,
          error: "",
          message: "Verified!",
        });
      },
    });
  };

  resendEmail = async () => {
    await this.setState({ loading: true });
    await this.props.resendEmail({
      onError: this.onError,
      onFinish: () => {
        this.setState({
          resent: true,
          loading: false,
          error: "",
          message: "Verification email resent. Please check your inbox.",
        });
      },
    });
  };

  renderConfirm = () => {
    const { emailVerified, isLoggedIn, history } = this.props;
    if (emailVerified) {
      return (
        <div>
          You're verified!{" "}
          <Link to="/app" style={{ fontFamily: "apercu", color: "black" }}>
            Click here to get started!
          </Link>
        </div>
      );
    } else if (this.state.loading) {
      return (
        <Loading
          element={<button></button>}
          color="white"
          width="20%"
          height={"auto"}
        />
      );
    } else {
      if (isLoggedIn) {
        if (!this.state.resent) {
          return (
            <button type="button" onClick={this.resendEmail}>
              Resend verification email
            </button>
          );
        } else {
          return <div>Verification email reset.</div>;
        }
      } else {
        return (
          <button type="button" onClick={() => history.push("/login")}>
            Log back in
          </button>
        );
      }
    }
  };

  render() {
    const { isLoggedIn, logoutUser } = this.props;
    const { error, message } = this.state;

    return (
      <form css={form}>
        <h2>CONFIRM EMAIL</h2>
        {error && <div className="warning">{error}</div>}
        {message && <div>{message}</div>}
        {this.renderConfirm()}
        {isLoggedIn && (
          <button
            type="button"
            onClick={logoutUser}
            style={{
              background: "none",
              color: "rgba(0, 0, 0, 0.5)",
            }}
          >
            LOGOUT
          </button>
        )}
      </form>
    );
  }
}

function mapStateToProps(state, props) {
  const { firebase, history } = props;
  const isLoggedIn = state.firebase.auth.uid ? true : false;
  const emailVerified =
    state.firebase.auth.emailVerified || state.firebase.profile.emailVerified;

  return {
    verifyEmail: async ({ onFinish, onError }) => {
      const { oobCode } = queryString.parse(props.location.search);
      if (oobCode) {
        try {
          const data = await props.firebase.auth().applyActionCode(oobCode);
          await onFinish(data);
          await firebase.updateProfile({ emailVerified: true });
          if (!isLoggedIn) history.push("/login");
        } catch (err) {
          await onError(err);
        }
      } else {
        await onError({ error: "no oobCode" });
      }
    },
    resendEmail: async ({ onFinish, onError }) => {
      try {
        const data = await firebase.auth().currentUser.sendEmailVerification();
        await onFinish(data);
      } catch (err) {
        await onError(err);
      }
    },
    logoutUser: firebase.logout,
    email: state.firebase.auth.email,
    isLoggedIn,
    emailVerified,
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps)
)(Component);
