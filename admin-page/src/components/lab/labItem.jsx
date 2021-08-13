import React, { memo, useRef } from "react";
import { StyledLi, StyledSpan, StyledButton } from "./labItem.styled";

const LabItem = memo(({ lab, onDelete, onUpdate }) => {
  const { id, name } = lab;
  const nameRef = useRef();
  const findTarget = e => {
    const id = e.currentTarget.closest("li").id;

    return id;
  };

  const findTargetToDelete = e => {
    const id = findTarget(e);
    const answer = window.confirm(
      "정말로 지우시겠습니까? 관련된 모든 내용이 삭제 됩니다."
    );
    if (answer) {
      onDelete(id);
    }
  };

  const findTargetToUpdate = e => {
    const id = findTarget(e);
    const currentName = nameRef.current.innerText;
    const newName = window.prompt("수정할 이름을 입력해주세요", currentName);
    onUpdate(id, newName);
  };

  return (
    <StyledLi key={name} id={id}>
      <div>
        <StyledSpan>{id}</StyledSpan>
        <StyledSpan ref={nameRef}>{name}</StyledSpan>
      </div>
      <div>
        <StyledButton onClick={findTargetToUpdate}>수정</StyledButton>
        <StyledButton color="#e43d40" onClick={findTargetToDelete}>
          삭제
        </StyledButton>
      </div>
    </StyledLi>
  );
});

export default LabItem;
