/** @jsx jsx **/
import React from "react";
import { jsx, css } from "@emotion/core";

const style = css``;

const SlackButton = () => {
  return <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=11810758689.319096746817"><img alt=""Sign in with Slack"" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>;
};

export default SlackButton;
