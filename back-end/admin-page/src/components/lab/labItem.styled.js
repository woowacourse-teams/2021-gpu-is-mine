import styled from "styled-components";

export const StyledLi = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
`;

export const StyledSpan = styled.span`
  margin-right: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const StyledButton = styled.button`
  border-radius: 10%;
  border: 1px solid gray;
  background-color: #eeede7;
  font-weight: 600;
  width: 3rem;
  :hover {
    background-color: #e43d40;
    cursor: pointer;
  }
`;
