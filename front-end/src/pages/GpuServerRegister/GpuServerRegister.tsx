import { useMyInfo } from "../../hooks";
import { Layout, Header, SubHeader, ManagerNavigation, UserNavigation } from "../../components";
import { StyledRegisterForm } from "./GpuServerRegister.styled";

const GpuServerRegister = () => {
  const { memberType, labName } = useMyInfo();

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<StyledRegisterForm />}
    />
  );
};

export default GpuServerRegister;
