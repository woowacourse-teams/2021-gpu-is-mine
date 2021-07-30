import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { StyledRegisterForm } from "./GpuServerRegister.styled";

const GpuServerRegister = () => (
  <Layout
    Header={<ManagerHeader />}
    SubHeader={<ManagerSubHeader />}
    Navigation={<ManagerNavigation />}
    Content={<StyledRegisterForm />}
  />
);

export default GpuServerRegister;
