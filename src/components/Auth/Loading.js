/** @jsx jsx **/
import React, { cloneElement } from "react";
import ReactLoading from "react-loading";
import { jsx, css } from "@emotion/core";

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh
`;

const Loading = ({
  element,
  className,
  css,
  style: propsStyle,
  type,
  width,
  height,
  color,
}) => {
  return cloneElement(
    element || <div css={style}></div>,
    { className, css: style, style: propsStyle },
    <ReactLoading
      className={"Loading"}
      type={type || "bubbles"}
      width={width || "15%"}
      height={height || "auto"}
      color={color || "#8F8DFF"}
    />
  );
};

export default Loading;
