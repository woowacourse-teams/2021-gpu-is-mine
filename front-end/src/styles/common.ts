import { css } from "styled-components";

export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const notSrOnly = css`
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
`;

export const textEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const cardStyle = css`
  padding: 1.25rem;
  background-color: var(--background);
  border-radius: 1rem;
  box-shadow: 0px 3px 5px 1px #e9eefa;
`;
