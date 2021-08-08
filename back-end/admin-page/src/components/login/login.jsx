import React, { useRef } from "react";
import { StyledSection, StyledForm, StyledLabel } from "./login.styled";

import { default as Button } from "../button/button";

const Login = () => {
  const formRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const login = {
      id: idRef.current.value || "",
      password: passwordRef.current.value || "",
    };
    formRef.current.reset();
    console.log(login);
  };
  return (
    <section>
      <StyledSection>
        <h2>ADMIN LOGIN</h2>
        <StyledForm ref={formRef} onSubmit={(e) => e.preventDefault()}>
          <StyledLabel>
            ID
            <input ref={idRef} type="text" name="id" />
          </StyledLabel>
          <StyledLabel>
            PASSWORD
            <input ref={passwordRef} type="password" name="password" />
          </StyledLabel>
          <Button text="로그인" onSubmit={onSubmit} />
        </StyledForm>
      </StyledSection>
    </section>
  );
};

export default Login;
