import { StyledLoading, StyledLoadingProps } from "./Loading.styled";

type LoadingProps = Partial<StyledLoadingProps> & {
  isOpen?: boolean;
};

const Loading = ({ size = "md", isOpen = true }: LoadingProps) =>
  isOpen ? (
    <StyledLoading size={size}>
      <div className="spinner" />
    </StyledLoading>
  ) : null;

export default Loading;
