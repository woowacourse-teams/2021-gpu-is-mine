import React from "react";

const Login = () => {
  return (
    <section>
      <section>
        <h2>LOGIN</h2>
        <form >
          <label>
            ID
            <input type="text" name="id"/>
          </label>
          <label>
            PASSWORD
            <input type="password" name="password"/>
          </label>
          <input type="submit" value="로그인"/>
        </form>
      </section>
    </section>
  );
};

export default Login;