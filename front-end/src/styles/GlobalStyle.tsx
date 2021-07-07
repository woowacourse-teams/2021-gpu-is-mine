import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import fonts from "./fonts/fonts.styled";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${fonts}

  :root {
    font-family: "Noto Sans KR";
    font-weight: 400;
  }
`;

export default GlobalStyle;
