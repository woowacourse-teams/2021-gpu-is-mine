import { useEffect, useState } from "react";
import cx from "classnames";
import useFetch from "../../../hooks/useFetch/useFetch";
import ManagerNavigation from "../../../domains/ManagerNavigation/ManagerNavigation";
import ManagerHeader from "../../../domains/ManagerHeader/ManagerHeader";
import ManagerSubHeader from "../../../domains/ManagerSubHeader/ManagerSubHeader";
import GpuServerInfoItem from "../../../domains/GpuServerInfoItem/GpuServerInfoItem";
import { Container } from "./GpuServerView.styled";
import { GpuServerViewResponses } from "../../../types/gpuServer";

const GpuServerView = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleClick = () => setIsNavVisible(!isNavVisible);

  const labName = "GPU내꼬야Lab";

  const { data, status, makeRequest, done } = useFetch<GpuServerViewResponses>(
    "http://3.35.169.99:8080/api/labs/1/gpus",
    { method: "get" }
  );

  useEffect(() => {
    makeRequest().then(console.log).catch(console.dir);
  }, [makeRequest]);

  useEffect(() => {
    console.log(status);

    if (status === "succeed") {
      alert("성공하였습니다");
      done();
    }
  }, [status, done]);

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
          {data &&
            data.gpuServers.map((res) => (
              <GpuServerInfoItem onDelete={makeRequest} key={res.id} {...res} />
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
