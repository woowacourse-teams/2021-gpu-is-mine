import { createGlobalStyle } from "styled-components";
import reset from "./reset";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${colors}

  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

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
