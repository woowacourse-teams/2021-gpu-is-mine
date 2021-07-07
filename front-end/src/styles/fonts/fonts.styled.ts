import { css } from "styled-components";
import NotoSansKR_Thin from "./noto-sans-kr/NotoSansKR-Thin.otf";
import NotoSansKR_Light from "./noto-sans-kr/NotoSansKR-Light.otf";
import NotoSansKR_Regular from "./noto-sans-kr/NotoSansKR-Regular.otf";
import NotoSansKR_Medium from "./noto-sans-kr/NotoSansKR-Medium.otf";
import NotoSansKR_Bold from "./noto-sans-kr/NotoSansKR-Bold.otf";
import NotoSansKR_Black from "./noto-sans-kr/NotoSansKR-Black.otf";

const notoSansKR = css`
  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Thin}) format("opentype");
    font-weight: 100;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Light}) format("opentype");
    font-weight: 300;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Regular}) format("opentype");
    font-weight: 400;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Medium}) format("opentype");
    font-weight: 500;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Bold}) format("opentype");
    font-weight: 700;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Black}) format("opentype");
    font-weight: 900;
  }
`;

const fonts = css`
  ${notoSansKR}
`;

export default fonts;
