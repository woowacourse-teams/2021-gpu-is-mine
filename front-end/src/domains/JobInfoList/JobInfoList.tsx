import { useEffect } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { Text, Loading, useToast } from "../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { StyledJobInfoList } from "./JobInfoList.styled";
import type { MemberType } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getJobAll, Job, selectJobActionState, selectJobAll } from "../../features/job/jobSlice";
import { RootState } from "../../app/store";

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

  const showToast = useToast();

  const { isLoading, isSucceed, isFailed } = useAppSelector((state: RootState) =>
    selectJobActionState(state, getJobAll)
  );

  const jobs = useAppSelector(selectJobAll);

  useEffect(() => {
    appDispatch(getJobAll())
      .unwrap()
      .catch((err) => {
        const error = err as SerializedError;

        showToast({ type: "error", title: error.name!, message: error.message });
      });
  }, [appDispatch, showToast]);

  const filteredJobList = jobs?.filter((res) => filterByMember(res, memberType, memberId)) ?? [];

  return (
    <>
      {isLoading && <Loading size="lg" />}
      {isFailed && (
        <Text size="lg" weight="bold">
          Job을 가져오는데 실패하였습니다 😞
        </Text>
      )}

      {isSucceed && (
        <StyledJobInfoList {...rest}>
          {filteredJobList.length === 0 ? (
            <Text size="lg" weight="bold">
              🚫 등록된 Job이 존재하지 않습니다. Job을 등록해주세요
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
