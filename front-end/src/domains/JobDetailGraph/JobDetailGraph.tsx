import { useEffect } from "react";
import { REFRESH_TIME } from "../../constants";
import { useGetJobDetailLogForGraph, useInterval } from "../../hooks";
import { Text, Loading } from "../../components";
import JobDetailGraphChart from "../JobDetailGraphChart/JobDetailGraphChart";
import { StyledJobDetailGraph } from "./JobDetailGraph.styled";

interface JobDetailGraphProps {
  className?: string;
  interval: boolean;
  jobId: number;
  labId: number;
}

const JobDetailGraph = ({ labId, jobId, interval, ...rest }: JobDetailGraphProps) => {
  const { data, makeRequest, isLoading, done } = useGetJobDetailLogForGraph({ labId, jobId });

  useInterval(() => makeRequest(), interval ? REFRESH_TIME : null);

  useEffect(() => {
    makeRequest();

    return done;
  }, [makeRequest, done]);

  return (
    <StyledJobDetailGraph {...rest}>
      <Text as="h3" weight="bold" size="lg">
        Graph
      </Text>
      {isLoading && <Loading />}
      {/* FIXME: parsedLogResponses 의 마지막 행은 제대로 parsing 된 로그가 아니어서,
      임시방편으로 그래프 그릴 시에 해당 값을 제외하고 그리고 있음 */}
      <JobDetailGraphChart data={data?.parsedLogResponses.slice(0, -1) ?? []} />
    </StyledJobDetailGraph>
  );
};

export default JobDetailGraph;
