import React from "react";
import { default as LabItem } from "./LabItem";
import styled from "styled-components";

const StyledUl = styled.ul`
  padding-left: 0;
  width: 100%;
  border-top: 3px solid #b9b7bd;
`;
const StyledSection = styled.section`
  width: 80%;
`;
const StyledSpan = styled.span`
  margin-right: 2rem;
`;

const LabList = ({ labs, onDelete, onUpdate }) => {
  return (
    <StyledSection>
      <h3>
        <StyledSpan>ID</StyledSpan>NAME
      </h3>
      <StyledUl>
        {labs.map(lab => (
          <LabItem
            key={lab.name}
            lab={lab}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </StyledUl>
    </StyledSection>
  );
};

export default LabList;
