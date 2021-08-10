import { Text } from "../../components";
import JobDetailGraphChart from "../JobDetailGraphChart/JobDetailGraphChart";
import { StyledJobDetailGraph } from "./JobDetailGraph.styled";
import { JobViewResponse } from "../../types";

interface JobDetailGraphProps {
  className?: string;
  detail: JobViewResponse;
}

const JobDetailGraph = ({ detail, ...rest }: JobDetailGraphProps) => (
  <StyledJobDetailGraph {...rest}>
    <Text as="h3" weight="bold" size="lg">
      그래프
    </Text>
    <JobDetailGraphChart data={[]} />
  </StyledJobDetailGraph>
);

export default JobDetailGraph;
