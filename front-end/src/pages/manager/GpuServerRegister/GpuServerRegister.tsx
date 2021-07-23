import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { StyledRegisterForm } from "./GpuServerRegister.styled";

const GpuServerRegister = () => {
  const labName = "GPU내꼬야Lab";

  return (
    <Layout
      Header={<ManagerHeader labName={labName} />}
      SubHeader={<ManagerSubHeader labName={labName} />}
      Navigation={<ManagerNavigation />}
      Content={<StyledRegisterForm />}
    />
  );
};

export default GpuServerRegister;
