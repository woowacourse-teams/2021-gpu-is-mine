import React, { memo } from "react";
import { StyledLi, StyledSpan, StyledButton } from "./labItem.styled";

const LabItem = memo(({ lab, onDelete }) => {
  const { id, name } = lab;
  const deletion = (e) => {
    const id = e.currentTarget.closest("li").id;
    onDelete(id);
  };
  return (
    <StyledLi key={name} id={id}>
      <div>
        <StyledSpan>{id}</StyledSpan>
        <StyledSpan>{name}</StyledSpan>
      </div>
      <StyledButton onClick={deletion}>삭제</StyledButton>
    </StyledLi>
  );
});

export default LabItem;
