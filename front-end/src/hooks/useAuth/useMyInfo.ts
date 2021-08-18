import { useAuth } from "./useAuth";

const useMyInfo = () => {
  const { myInfo } = useAuth();

  if (!myInfo) {
    throw new Error("myInfo가 로드되지 않았습니다.");
  }

  return {
    ...myInfo,
    memberId: myInfo.id,
    labId: myInfo.labResponse.id,
    labName: myInfo.labResponse.name,
  };
};

export default useMyInfo;
