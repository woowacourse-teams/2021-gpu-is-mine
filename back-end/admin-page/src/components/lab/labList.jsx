import React from "react";
import { default as LabItem } from "./labItem";

const LabList = ({ labs, onDelete }) => {
  return (
    <ul>
      {labs.map((lab) => (
        <LabItem key={lab.name} lab={lab} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default LabList;
