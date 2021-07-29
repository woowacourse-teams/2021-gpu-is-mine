import { Redirect } from "react-router-dom";

const Logout = () => {
  sessionStorage.removeItem("accessToken");

  return <Redirect to="/" />;
};

export default Logout;
