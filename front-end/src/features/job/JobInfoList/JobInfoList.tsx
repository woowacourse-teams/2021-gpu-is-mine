/* eslint-disable jsx-a11y/accessible-emoji */
import { useEffect } from "react";
import { fetchJobAll, selectJobActionState, selectJobAll, selectJobByMember } from "../jobSlice";
import { selectMyInfo } from "../../member/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useToggle } from "../../../hooks";
import { Text, Loading, useToast } from "../../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { Label, StyledJobInfoList } from "./JobInfoList.styled";
import type { JobStatus } from "../../../types";
import type { RootState } from "../../../app/store";
import type { Job, RequiredSerializedError } from "../jobSlice";

interface JobInfoListProps {
  className?: string;
}

const priority: Record<JobStatus, number> = {
  RUNNING: 0, // highest
  WAITING: 1,
  COMPLETED: 2,
  CANCELED: 3,
  FAILED: 4, // lowest
} as const;

const parseDate = (str: string): number => {
  const num = Date.parse(str);

  return Number.isNaN(num) ? 0 : num;
};

const sortByResponse = (a: Job, b: Job) => {
  const diffStatus = priority[a.status] - priority[b.status];

  if (diffStatus !== 0) {
    return diffStatus;
  }

  const startTimeDiff = parseDate(b.startTime) - parseDate(a.startTime);

  if (startTimeDiff !== 0) {
    return startTimeDiff;
  }

  const endDiff = parseDate(b.endTime) - parseDate(a.endTime);

  return endDiff;
};

const JobInfoList = ({ ...rest }: JobInfoListProps) => {
  const appDispatch = useAppDispatch();

  const showToast = useToast();

  const { memberId, memberType } = useAppSelector(selectMyInfo);

  const { isLoading, isSucceed, isSettled } = useAppSelector((state: RootState) =>
    selectJobActionState(state, fetchJobAll)
  );

  const [checked, toggle] = useToggle(false);

  const jobs = useAppSelector(
    memberType === "MANAGER" || checked
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
        {memberType === "USER" && (
          <Label>
            <input type="checkbox" checked={checked} onChange={() => toggle()} />
            <Text weight="medium" size="md">
              {checked ? "전체 Job 보기 해제" : "전체 Job 보기"}
            </Text>
          </Label>
        )}

        {isSettled && jobs.length === 0 ? (
          <Text size="lg" weight="bold">
            {isSucceed
              ? "🚫 등록된 Job이 존재하지 않습니다."
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
