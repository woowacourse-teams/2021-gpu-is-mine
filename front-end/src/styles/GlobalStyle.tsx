import { createGlobalStyle } from "styled-components";
import fonts from "./fonts/fonts.styled";
import reset from "./reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${fonts}

  :root {
    font-family: "Noto Sans KR";
    font-weight: 400;
  }
`;

export default GlobalStyle;
