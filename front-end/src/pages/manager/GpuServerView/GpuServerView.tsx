import { useState } from "react";
import cx from "classnames";
import ManagerNavigation from "../../../domains/ManagerNavigation/ManagerNavigation";
import ManagerHeader from "../../../domains/ManagerHeader/ManagerHeader";
import ManagerSubHeader from "../../../domains/ManagerSubHeader/ManagerSubHeader";
import GpuServerInfoItem from "../../../domains/GpuServerInfoItem/GpuServerInfoItem";
import GpuServerViewResponse from "../../../fixtures/gpuServeViewrResponse";
import { Container } from "./GpuServerView.styled";

const GpuServerView = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleClick = () => setIsNavVisible(!isNavVisible);

  const labName = "GPU내꼬야Lab";

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
        <section className="info-item-wrapper">
          {GpuServerViewResponse.gpus.map((props) => (
            <GpuServerInfoItem {...props} />
          ))}
        </section>
      </main>
      <footer className="footer">
        <span>All Rights Reserved gpu-is-mine</span>
      </footer>
    </Container>
  );
};

export default GpuServerView;
