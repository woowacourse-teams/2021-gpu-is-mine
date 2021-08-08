import React, { useState, useEffect } from "react";
import { default as LabList } from "./labList";
import { default as LabAddForm } from "./labAddForm";
import { StyledSection } from "./lab.styled";

const Lab = ({ apiService }) => {
  const [labs, setLabs] = useState([]);
  useEffect(() => {
    apiService
      .getLabs() //
      .then((labs) => setLabs(labs));
  }, [apiService]);

  const onAdd = (lab) => {
    apiService
      .saveLab(lab) //
      .then((newLabs) => setLabs(newLabs));
  };

  const onDelete = (id) => {
    apiService.deleteLab(id);
  };

  return (
    <section>
      <StyledSection>
        <h2>랩 관리</h2>
        <LabAddForm onAdd={onAdd} />
        <LabList labs={labs} onDelete={onDelete} />
      </StyledSection>
    </section>
  );
};

export default Lab;
