import React from "react";
import { default as LabItem } from "./labItem";

const LabList = ({ labs }) => {
  return (
    <ul>
      {labs.map((lab) => (
        <LabItem key={lab.name} lab={lab} />
      ))}
    </ul>
  );
};

export default LabList;
