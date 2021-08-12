import { createGlobalStyle } from "styled-components";
import reset from "./reset";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${colors}


  :root {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    color: var(--text-dark);
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
    position: relative;
  }
`;

export default GlobalStyle;
