import styled from "styled-components";
import VerticalBox from "../VerticalBox/VerticalBox";

// 변수명 확인
export const BackGroundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 70; // TODO: Confirm z-index
`;

export const ConfirmWrapper = styled(VerticalBox)`
  position: relative;
  box-shadow: 0 4px 4px 0 #0005;

  min-width: 540px;
  min-height: 250px;

  background-color: var(--secondary-50);
  border-radius: 1rem;

  .text-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 3;

    padding: 1rem 2rem;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row;
    flex-grow: 1;

    button {
      color: var(--on-secondary-50);
      font-size: 1.5rem;
      font-weight: bold;
      box-shadow: 0 0 8px #ccc;
      background-color: var(--secondary-50);
    }
    button:hover {
      background-color: var(--secondary-300);
    }

    .option-wrapper__cancel {
      border-bottom-left-radius: 1rem;
    }

    .option-wrapper__confirm {
      border-bottom-right-radius: 1rem;
    }
  }
`;
