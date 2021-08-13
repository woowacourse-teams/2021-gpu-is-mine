import React, { useRef } from "react";
<<<<<<< HEAD
import { default as Button } from "../Button/Button";
=======
import { default as Button } from "../button/Button";
>>>>>>> origin/develop
import { StyledForm, StyledLabel, StyledInput } from "./LabAddForm.styled";

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
