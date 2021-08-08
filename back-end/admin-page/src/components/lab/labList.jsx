import React from "react";

const LabList = ({ labs }) => {
  return (
    <ul>
      {labs.map((lab) => (
        <li key={lab.id}>{lab.name}</li>
      ))}
    </ul>
  );
};

export default LabList;
