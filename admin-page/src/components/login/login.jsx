import React, { useRef } from "react";
import { StyledSection, StyledForm, StyledLabel } from "./login.styled";

import { default as Button } from "../button/button";

const Login = ({ apiService }) => {
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onLogin = e => {
    e.preventDefault();
    const loginData = {
      email: emailRef.current.value || "",
      password: passwordRef.current.value || "",
    };
    formRef.current.reset();
    apiService
      .login(loginData.email, loginData.password) //
      .then(accessToken => {
        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);
          window.location.href = "/lab";
        } else {
          alert("관리자 로그인이 필요합니다");
        }
      });
  };
  return (
    <section>
      <StyledSection>
        <h2>ADMIN LOGIN</h2>
        <StyledForm ref={formRef} onSubmit={e => e.preventDefault()}>
          <StyledLabel>
            EMAIN
            <input ref={emailRef} type="text" name="id" />
          </StyledLabel>
          <StyledLabel>
            PASSWORD
            <input ref={passwordRef} type="password" name="password" />
          </StyledLabel>
          <Button text="로그인" onSubmit={onLogin} />
        </StyledForm>
      </StyledSection>
    </section>
  );
};

export default Login;
