import React, { useState, useEffect } from "react";
import { default as LabList } from "./labList";
import { default as LabAddForm } from "./labAddForm";

const Lab = ({ apiService }) => {
  const [labs, setLabs] = useState([]);
  useEffect(() => {
    apiService
      .getLabs() //
      .then((labs) => setLabs(labs));
  }, [apiService]);

  const onAdd = (lab) => {
    apiService.saveLab(lab);
    // todo: id 어떻게 db에서 다시 가져오는지 모르겠음..ㅠ
    setLabs((labs) => {
      const updated = [...labs];
      updated.push(lab);
      return updated;
    });
  };

  const onDelete = (id) => {
    apiService.deleteLab(id);
  };

  return (
    <section>
      <section>
        <h2>랩 관리</h2>
        <LabAddForm onAdd={onAdd} />
        <LabList labs={labs} onDelete={onDelete} />
      </section>
    </section>
  );
};

export default Lab;
