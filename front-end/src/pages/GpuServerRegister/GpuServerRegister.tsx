import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { StyledRegisterForm } from "./GpuServerRegister.styled";

const GpuServerRegister = () => {
  const { memberType } = useMyInfo();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<StyledRegisterForm />}
    />
  );
};

export default GpuServerRegister;
