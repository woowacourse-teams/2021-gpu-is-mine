import { useAppSelector } from "../../app/hooks";
import { selectMyInfo } from "../../features/member/memberSlice";

// TODO: 리덕스 모든 도메인에 적용 후 useMyInfo 훅 제거하기
const useMyInfo = () => useAppSelector(selectMyInfo);

export default useMyInfo;
