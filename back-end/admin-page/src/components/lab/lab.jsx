import React, { useState, useEffect } from "react";
import { default as LabList } from "./labList";
import { default as LabAddForm } from "./labAddForm";
import { StyledSection } from "./lab.styled";

const Lab = ({ apiService }) => {
  const [labs, setLabs] = useState([]);
  useEffect(() => {
    apiService //
      .getLabs()
      .then(labs => setLabs(labs));
  }, [apiService]);

  const onAdd = lab => {
    apiService //
      .saveLab(lab)
      .then(newLabs => setLabs(newLabs));
  };

  const onDelete = id => {
    if (id === "1") {
      alert("1번 랩은 삭제할 수 없습니다.");
      return;
    }
    apiService //
      .deleteLab(id)
      .then(newLabs => setLabs(newLabs));
  };

  const onUpdate = (id, name) => {
    if (id === "1") {
      alert("1번 랩은 수정할 수 없습니다.");
      return;
    }
    apiService //
      .updateLab(id, name)
      .then(newLabs => setLabs(newLabs));
  };

  return (
    <section>
      <StyledSection>
        <h2>랩 관리</h2>
        <LabAddForm onAdd={onAdd} />
        <LabList labs={labs} onDelete={onDelete} onUpdate={onUpdate} />
      </StyledSection>
    </section>
  );
};

export default Lab;
