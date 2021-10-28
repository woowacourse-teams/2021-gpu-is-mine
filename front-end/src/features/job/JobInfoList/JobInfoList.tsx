/* eslint-disable jsx-a11y/accessible-emoji */
import { useEffect } from "react";
import { Text, Loading, useToast } from "../../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { StyledJobInfoList } from "./JobInfoList.styled";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchJobAll,
  Job,
  selectJobActionState,
  selectJobAll,
  selectJobByMember,
} from "../jobSlice";
import { selectMyInfo } from "../../member/authSlice";
import type { RequiredSerializedError } from "../jobSlice";
import type { RootState } from "../../../app/store";

interface JobInfoListProps {
  className?: string;
}

const priority = {
  RUNNING: 0, // highest
  WAITING: 1,
  COMPLETED: 2,
  CANCELED: 3, // lowest
} as const;

const sortByResponse = (a: Job, b: Job) => priority[a.status] - priority[b.status];

const JobInfoList = ({ ...rest }: JobInfoListProps) => {
  const appDispatch = useAppDispatch();

  const showToast = useToast();

  const { memberId, memberType } = useAppSelector(selectMyInfo);

  const { isLoading, isSucceed, isSettled } = useAppSelector((state: RootState) =>
    selectJobActionState(state, fetchJobAll)
  );

  const jobs = useAppSelector(
    memberType === "MANAGER"
      ? selectJobAll
      : (state: RootState) => selectJobByMember(state, memberId)
  );

  useEffect(() => {
    appDispatch(fetchJobAll())
      .unwrap()
      .catch((err) => {
        const error = err as RequiredSerializedError;

        showToast({ type: "error", title: error.name, message: error.message });
      });
  }, [appDispatch, showToast]);

  return (
    <>
      {isLoading && <Loading size="lg" />}

      <StyledJobInfoList {...rest}>
        {isSettled && jobs.length === 0 ? (
          <Text size="lg" weight="bold">
            {isSucceed
              ? "🚫 등록된 Job이 존재하지 않습니다. Job을 등록해주세요"
              : "Job을 가져오는데 실패하였습니다 😞"}
          </Text>
        ) : (
          jobs.sort(sortByResponse).map((res) => <JobInfoItem key={res.id} {...res} />)
        )}
      </StyledJobInfoList>
    </>
  );
};

export default JobInfoList;
