import styled, { css, keyframes } from "styled-components";
import Button from "../Button/Button";

const fadeInFadeOut = keyframes`
0% {
  opacity: 0;
}
20% {
  opacity: 1;
}
90% {
  opacity: 1;
  transform: scale(1);
}
100% {
  opacity: 0;
  transform: scale(0.75);
}
`;

const defaultFadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const infoToastStyle = css`
  color: #084298;
  background-color: #cfe2ff;
  border-color: #b6d4fe;

  & button svg {
    fill: #084298;
  }
`;

const successToastStyle = css`
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;

  & button svg {
    fill: #0f5132;
  }
`;

const warningToastStyle = css`
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;

  & button svg {
    fill: #664d03;
  }
`;

const errorToastStyle = css`
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;

  & button svg {
    fill: #842029;
  }
`;

export const StyledToast = styled.div<{
  type: "info" | "success" | "warning" | "error";
  duration: number | null;
}>`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  border-radius: 0.75rem;

  ${({ duration }) =>
    duration === null
      ? css`
          animation: ${defaultFadeIn} ease-in-out 0.5s;
        `
      : css`
          animation: ${fadeInFadeOut} ease-in-out ${duration / 1000}s;
        `}

  ${({ type }) => {
    const style = {
      info: infoToastStyle,
      success: successToastStyle,
      warning: warningToastStyle,
      error: errorToastStyle,
    };

    return style[type];
  }}
`;

export const Body = styled.div`
  width: 100%;
`;

export const CloseButton = styled(Button)`
  width: 2rem;
  height: 2rem;
  align-self: flex-start;
`;
