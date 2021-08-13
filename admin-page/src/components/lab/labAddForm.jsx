import React, { useRef } from "react";
import { default as Button } from "../button/button";
import { StyledForm, StyledLabel, StyledInput } from "./labAddForm.styled";

const LabAddForm = ({ onAdd }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const onSubmit = e => {
    e.preventDefault();
    const lab = {
      name: nameRef.current.value || "",
    };
    formRef.current.reset();
    onAdd(lab);
  };

  return (
    <StyledForm ref={formRef} onSubmit={onSubmit}>
      <StyledLabel>
        NAME
        <StyledInput ref={nameRef} type="text" name="name" />
      </StyledLabel>
      <Button text="등록하기" />
    </StyledForm>
  );
};

export default LabAddForm;
