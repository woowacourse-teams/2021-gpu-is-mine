import { css } from "styled-components";
import NotoSansKR_Thin from "./noto-sans-kr/NotoSansKR-Thin.woff2";
import NotoSansKR_Light from "./noto-sans-kr/NotoSansKR-Light.woff2";
import NotoSansKR_Regular from "./noto-sans-kr/NotoSansKR-Regular.woff2";
import NotoSansKR_Medium from "./noto-sans-kr/NotoSansKR-Medium.woff2";
import NotoSansKR_Bold from "./noto-sans-kr/NotoSansKR-Bold.woff2";
import NotoSansKR_Black from "./noto-sans-kr/NotoSansKR-Black.woff2";

const notoSansKR = css`
  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Thin}) format("woff2");
    font-weight: 100;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Light}) format("woff2");
    font-weight: 300;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Regular}) format("woff2");
    font-weight: 400;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Medium}) format("woff2");
    font-weight: 500;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Bold}) format("woff2");
    font-weight: 700;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR_Black}) format("woff2");
    font-weight: 900;
  }
`;

const fonts = css`
  ${notoSansKR}
`;

export default fonts;
