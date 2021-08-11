import { useEffect } from "react";
import { useGetJobDetailLogForGraph } from "../../hooks/useApi/useApi";
import { Text, Loading } from "../../components";
import JobDetailGraphChart from "../JobDetailGraphChart/JobDetailGraphChart";
import { StyledJobDetailGraph } from "./JobDetailGraph.styled";
import { JobViewResponse } from "../../types";

interface JobDetailGraphProps {
  className?: string;
  detail: JobViewResponse;
  jobId: number;
  labId: number;
}

const JobDetailGraph = ({ labId, jobId, detail, ...rest }: JobDetailGraphProps) => {
  const { data, makeRequest, isLoading, done } = useGetJobDetailLogForGraph({ labId, jobId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();

    return done;
  }, [makeRequest, done]);

  return (
    <StyledJobDetailGraph {...rest}>
      <Text as="h3" weight="bold" size="lg">
        그래프
      </Text>
      {isLoading && <Loading />}
      <JobDetailGraphChart data={data?.parsedLogResponses ?? []} />
    </StyledJobDetailGraph>
  );
};

export default JobDetailGraph;
