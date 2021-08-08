import React, { memo } from "react";

const LabItem = memo(({ lab, onDelete }) => {
  const { id, name } = lab;
  const deletion = (e) => {
    const id = e.currentTarget.closest("li").id;
    onDelete(id);
  };
  return (
    <li key={name} id={id}>
      <span>{id}:</span>
      <span>{name}</span>
      <button onClick={deletion}>삭제하기</button>
    </li>
  );
});

export default LabItem;
