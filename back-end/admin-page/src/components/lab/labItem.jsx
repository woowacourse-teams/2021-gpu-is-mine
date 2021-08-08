import React, { memo } from "react";

const LabItem = memo(({ lab }) => {
  const { id, name } = lab;
  return (
    <li>
      <span>{id}</span>
      <span>{name}</span>
    </li>
  );
});

export default LabItem;
