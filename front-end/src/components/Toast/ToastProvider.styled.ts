import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 5.5rem;
  left: 50%;
  transform: translateX(-50%);

  width: 25rem;
  z-index: 1000;
  row-gap: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;
