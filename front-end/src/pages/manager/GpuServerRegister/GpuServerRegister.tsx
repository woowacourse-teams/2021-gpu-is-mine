import { useState } from "react";
import cx from "classnames";
import ManagerNavigation from "../../../domains/ManagerNavigation/ManagerNavigation";
import ManagerHeader from "../../../domains/ManagerHeader/ManagerHeader";
import ManagerSubHeader from "../../../domains/ManagerSubHeader/ManagerSubHeader";
import { Container } from "./GpuServerRegister.styled";
import GpuServerRegisterForm from "../../../domains/GpuServerRegisterForm/GpuServerRegisterForm";

const GpuServerRegister = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleClick = () => setIsNavVisible(!isNavVisible);

  const labName = "동동Lab";

  return (
    <Container>
      <div className="header">
        <ManagerHeader labName={labName} />
      </div>
      <div className="sub-header">
        <ManagerSubHeader labName={labName} onClick={handleClick} />
      </div>
      <div className={cx("nav", isNavVisible && "nav--visible")}>
        <ManagerNavigation />
      </div>
      <main className="content">
        <GpuServerRegisterForm className="register-form" />
      </main>
      <footer className="footer">
        <span>All Rights Reserved gpu-is-mine</span>
      </footer>
    </Container>
  );
};

export default GpuServerRegister;
