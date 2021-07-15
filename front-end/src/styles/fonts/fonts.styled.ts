import { css } from "styled-components";

import n100w from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-100.woff";
import n100w2 from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-100.woff2";
import n300w from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-300.woff";
import n300w2 from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-300.woff2";
import n500w from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-500.woff";
import n500w2 from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-500.woff2";
import n700w from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-700.woff";
import n700w2 from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-700.woff2";
import n900w from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-900.woff";
import n900w2 from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-900.woff2";
import n400w from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-regular.woff";
import n400w2 from "./noto-sans-kr/noto-sans-kr-v13-latin_korean-regular.woff2";

//  format("woff2"):  Chrome 26+, Opera 23+, Firefox 39+
//  format("woff"): Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+
const notoSansKR = css`
  /* noto-sans-kr-100 - latin_korean */
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 100;
    src: local("Noto Sans KR"), url(${n100w2}) format("woff2"), url(${n100w}) format("woff");
  }

  /* noto-sans-kr-300 - latin_korean */
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 300;
    src: local("Noto Sans KR"), url(${n300w2}) format("woff2"), url(${n300w}) format("woff");
  }

  /* noto-sans-kr-regular - latin_korean */
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    src: local("Noto Sans KR"), url(${n400w2}) format("woff2"), url(${n400w}) format("woff");
  }

  /* noto-sans-kr-500 - latin_korean */
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    src: local("Noto Sans KR"), url(${n500w2}) format("woff2"), url(${n500w}) format("woff");
  }

  /* noto-sans-kr-700 - latin_korean */
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    src: local("Noto Sans KR"), url(${n700w2}) format("woff2"), url(${n700w}) format("woff");
  }

  /* noto-sans-kr-900 - latin_korean */
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 900;
    src: local("Noto Sans KR"), url(${n900w2}) format("woff2"), url(${n900w}) format("woff");
  }
`;

const fonts = css`
  ${notoSansKR}
`;

export default fonts;
