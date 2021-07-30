import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGetJobDetail, useAuth } from "../../hooks";
import { Loading, Text, Alert } from "../../components";
import {
  StyledJobInfoItemDetail,
  JobSummaryContainer,
  GraphContainer,
  LogContainer,
} from "./JobInfoItemDetail.styled";
import { MyInfoResponse } from "../../types";

const useJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) => {
  const { status, makeRequest, data } = useGetJobDetail({ labId, jobId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return { status, detail: data };
};

const JobInfoItemDetail = () => {
  const history = useHistory();

  const { myInfo } = useAuth() as { myInfo: MyInfoResponse };

  const { jobId } = useParams<{ jobId?: string }>();

  const { status, detail } = useJobDetail({ labId: myInfo.labResponse.id, jobId: Number(jobId) });

  const goToPreviousPage = () => history.go(-1);

  return (
    <>
      {status === "loading" && <Loading size="lg" />}
      {status === "failed" && (
        <Alert onConfirm={goToPreviousPage}>
          <Text>Job 상세 조회에 실패했습니다.</Text>
        </Alert>
      )}
      {status === "succeed" && detail && (
        <StyledJobInfoItemDetail>
          <JobSummaryContainer>
            <div>
              <Text as="h3">Job 이름</Text>
              <Text>{detail.name}</Text>
            </div>
            <div>
              <Text as="h3">Job 상태</Text>
              <Text>{detail.status}</Text>
            </div>
            <div>
              <Text as="h3">Job 등록자</Text>
              <Text>{detail.memberName}</Text>
            </div>
            <div>
              <Text as="h3">할당된 서버</Text>
              <Text>{detail.gpuServerName}</Text>
            </div>
          </JobSummaryContainer>
          <GraphContainer />
          <LogContainer>
            <h3>Log</h3>
            <div />
          </LogContainer>
        </StyledJobInfoItemDetail>
      )}
    </>
  );
};

export default JobInfoItemDetail;
