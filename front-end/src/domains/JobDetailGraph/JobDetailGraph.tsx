import { Text } from "../../components";
import { StyledJobDetailGraph, Graph } from "./JobDetailGraph.styled";
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
    <Graph />
  </StyledJobDetailGraph>
);

export default JobDetailGraph;
