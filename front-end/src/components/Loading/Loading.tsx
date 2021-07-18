import { StyledLoading, StyledLoadingProps } from "./Loading.styled";

type LoadingProps = Partial<StyledLoadingProps>;

const Loading = ({ size = "md" }: LoadingProps) => (
  <StyledLoading size={size}>
    <div className="spinner" />
  </StyledLoading>
);

export default Loading;
