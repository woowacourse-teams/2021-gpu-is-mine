import React, { useState, useEffect } from "react";

const LabList = ({ apiService }) => {
  const [labs, setLabs] = useState([]);
  useEffect(() => {
    apiService
      .getLabs() //
      .then((labs) => setLabs(labs));
  }, [apiService]);

  return (
    <ul>
      {labs.map((lab) => (
        <li>{lab.name}</li>
      ))}
    </ul>
  );
};

export default LabList;
