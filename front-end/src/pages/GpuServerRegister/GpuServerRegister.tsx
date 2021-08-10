import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { StyledRegisterForm } from "./GpuServerRegister.styled";

const GpuServerRegister = () => {
  const { memberType, labName } = useMyInfo();

  return (
    <Layout
      Header={<Header labName={labName} />}
      SubHeader={<SubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<StyledRegisterForm />}
    />
  );
};

export default GpuServerRegister;
