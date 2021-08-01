import { useAuth } from "../useAuth/useAuth";

const useLabId = () => {
  const { myInfo } = useAuth();

  if (!myInfo) {
    throw new Error("myInfo가 로드되지 않았습니다.");
  }

  return myInfo.labResponse.id;
};

export default useLabId;
