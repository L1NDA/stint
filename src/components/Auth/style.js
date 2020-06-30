import { css } from "@emotion/core";

export const style = css`
  display: grid;
  grid-template-columns: 3fr 2fr;
  justify-items: center;
`;

export const form = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  align-self: center;
  text-align: center;

  width: 100%;
  max-width: 300px;
`;

export default style;
