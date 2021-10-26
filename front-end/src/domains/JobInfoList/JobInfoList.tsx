import { useEffect } from "react";
import { Text, Loading } from "../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { StyledJobInfoList } from "./JobInfoList.styled";
import { MESSAGE } from "../../constants";
import { MemberType } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getJobAll, Job, selectJobActionState, selectJobAll } from "../../features/job/jobSlice";

interface JobInfoListProps {
  className?: string;
  labId: number;
  memberId: number;
  memberType: MemberType;
}

const priority = {
  RUNNING: 0, // highest
  WAITING: 1,
  COMPLETED: 2,
  CANCELED: 3, // lowest
} as const;

const sortByResponse = (a: Job, b: Job) => priority[a.status] - priority[b.status];

const filterByMember = (response: Job, memberType: MemberType, memberId: number) =>
  memberType === "MANAGER" || response.memberId === memberId;

const JobInfoList = ({ labId, memberId, memberType, ...rest }: JobInfoListProps) => {
  const appDispatch = useAppDispatch();

  const { isLoading, isSucceed, isFailed } = useAppSelector(selectJobActionState(getJobAll));

  const jobs = useAppSelector(selectJobAll);

  useEffect(() => {
    appDispatch(getJobAll());
  }, [appDispatch]);

  const filteredJobList = jobs?.filter((res) => filterByMember(res, memberType, memberId)) ?? [];

  return (
    <>
      {isLoading && <Loading size="lg" />}
      {isFailed && (
        <Text size="lg" weight="bold">
          {MESSAGE.ERROR.SERVER}
        </Text>
      )}

      {isSucceed && jobs && (
        <StyledJobInfoList {...rest}>
          {filteredJobList.length === 0 ? (
            <Text size="lg" weight="bold">
              🚫 등록된 작업이 존재하지 않습니다.
            </Text>
          ) : (
            filteredJobList
              .slice()
              .sort(sortByResponse)
              .map((res) => <JobInfoItem key={res.id} {...res} />)
          )}
        </StyledJobInfoList>
      )}
    </>
  );
};

export default JobInfoList;
