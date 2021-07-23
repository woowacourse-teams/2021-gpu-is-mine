import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { StyledRegisterForm } from "./JobRegister.styled";

const JobRegister = () => {
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

export default JobRegister;
