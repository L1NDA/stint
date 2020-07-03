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
  state = { message: "", sent: false, loading: false };

  componentDidMount() {
    this.props.checkActionCode({ onError: this.onError });
  }

  onError = ({ message }) => this.setState({ message, loading: false });

  onFormSubmitConfirm = (event, oobCode) => {
    event.preventDefault();
    this.setState({ loading: true });
    const password = this.refs.password.value;
    const confirmPassword = this.refs["confirm-password"].value;
    if (password === confirmPassword) {
      this.props.confirmPasswordReset({
        oobCode,
        password,
        onFinish: () => this.setState({ loading: false }),
        onError: this.onError,
      });
    }
  };

  render() {
    const { loading, message } = this.state;
    return (
      <form css={form} onSubmit={(e) => this.onFormSubmitConfirm(e)}>
        <h2>RESET PASSWORD</h2>
        <input type="password" ref="password" placeholder="Password" />
        <input
          type="password"
          ref="confirm-password"
          placeholder="Confirm Password"
        />
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
        {message && <div className="warning">{message}</div>}
        <Link to="/login">Already have an account? Log in</Link>
        <Link to="/register">Create an account</Link>
      </form>
    );
  }
}

function mapStateToProps(state, props) {
  const { oobCode } = queryString.parse(props.location.search);

  return {
    checkActionCode: async ({ onError }) => {
      try {
        const { verifyPasswordResetCode } = props.firebase;
        await verifyPasswordResetCode(oobCode);
      } catch (err) {
        await onError(err);
      }
    },
    confirmPasswordReset: async ({ password, onFinish, onError }) => {
      try {
        const {
          verifyPasswordResetCode,
          confirmPasswordReset,
        } = props.firebase;
        const email = await verifyPasswordResetCode(oobCode);
        const data = await confirmPasswordReset(oobCode, password);
        await onFinish(data);
        await props.firebase.login({ email, password });
        await props.history.push("/");
      } catch (err) {
        await onError(err);
      }
    },
  };
}

export default compose(
  withRouter,
  firebaseConnect(),
  connect(mapStateToProps)
)(Component);
