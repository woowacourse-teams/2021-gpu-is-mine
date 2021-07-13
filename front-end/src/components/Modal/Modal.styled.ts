import styled from "styled-components";

export const Dimmer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  // TODO: Dimmer z-index 상수화
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ContentsWrapper = styled.div`
  position: relative;
  width: fit-content;
`;
