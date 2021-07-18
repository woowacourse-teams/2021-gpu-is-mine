import { useEffect } from "react";
import cx from "classnames";
import { useToggle, useFetch, useBreakpoints } from "../../../hooks";
import { Text } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { GpuServerInfoItem } from "../../../domains/GpuServer";
import { Container } from "./GpuServerView.styled";
import { API_ENDPOINT } from "../../../constants";
import { GpuServerViewResponses } from "../../../types";

const GpuServerView = () => {
  const [isNavVisible, handleClick] = useToggle(false);
  const { isTablet, isLaptop } = useBreakpoints();

  const labName = "GPU내꼬야Lab";

  const { data, status, makeRequest, done } = useFetch<GpuServerViewResponses>(
    API_ENDPOINT.LABS(1).GPUS,
    { method: "get" }
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  useEffect(() => {
    if (status === "succeed") {
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
          {data?.gpuServers.length === 0 ? (
            <Text size={isTablet || isLaptop ? "lg" : "md"} weight="bold">
              🚫 등록된 GPU 서버가 존재하지 않습니다.
            </Text>
          ) : (
            data?.gpuServers.map((res) => (
              <GpuServerInfoItem refresh={makeRequest} key={res.id} {...res} />
            ))
          )}
        </section>
      </main>
      <footer className="footer">
        <span>All Rights Reserved gpu-is-mine</span>
      </footer>
    </Container>
  );
};

export default GpuServerView;
