import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";

import { JobInfoList } from "../../domains/Job";

const JobView = () => {
  const {
    labResponse: { id: labId },
    id: memberId,
    memberType,
  } = useMyInfo();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<JobInfoList labId={labId} memberId={memberId} memberType={memberType} />}
    />
  );
};

export default JobView;
