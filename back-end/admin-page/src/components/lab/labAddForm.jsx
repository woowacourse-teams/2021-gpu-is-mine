import React, { useRef } from "react";

const LabAddForm = ({ onAdd }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const lab = {
      name: nameRef.current.value || "",
    };
    formRef.current.reset();
    onAdd(lab);
  };

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <label>
        lab name
        <input ref={nameRef} type="text" name="name" />
      </label>
      <button name="saveLab" onClick={onSubmit}>
        등록하기
      </button>
    </form>
  );
};

export default LabAddForm;
