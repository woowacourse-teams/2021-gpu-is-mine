import { useEffect } from "react";
import { useGetJobAll } from "../../hooks";
import { Text, Loading } from "../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { StyledJobInfoList } from "./JobInfoList.styled";
import { MESSAGE } from "../../constants";
import { JobViewResponse, MemberType } from "../../types";

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

const sortByResponse = (a: JobViewResponse, b: JobViewResponse) =>
  priority[a.status] - priority[b.status];

const filterByMember = (response: JobViewResponse, memberType: MemberType, memberId: number) =>
  memberType === "MANAGER" || response.memberId === memberId;

const JobInfoList = ({ labId, memberId, memberType, ...rest }: JobInfoListProps) => {
  const { data, status, makeRequest } = useGetJobAll({ labId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  const filteredJobList =
    data?.jobResponses.filter((res) => filterByMember(res, memberType, memberId)) ?? [];

  return (
    <>
      {status === "loading" && <Loading size="lg" />}
      {status === "failed" && (
        <Text size="lg" weight="bold">
          {MESSAGE.ERROR.SERVER}
        </Text>
      )}

      {status === "succeed" && data && (
        <StyledJobInfoList {...rest}>
          {filteredJobList.length === 0 ? (
            <Text size="lg" weight="bold">
              🚫 등록된 작업이 존재하지 않습니다.
            </Text>
          ) : (
            filteredJobList
              .slice()
              .sort(sortByResponse)
              .map((res) => (
                <JobInfoItem key={res.id} refresh={() => makeRequest()} labId={labId} {...res} />
              ))
          )}
        </StyledJobInfoList>
      )}
    </>
  );
};

export default JobInfoList;
