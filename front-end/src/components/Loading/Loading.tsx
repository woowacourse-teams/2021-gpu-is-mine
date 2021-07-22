import { HTMLAttributes } from "react";
import { StyledLoading, StyledLoadingProps } from "./Loading.styled";

interface LoadingProps extends Partial<StyledLoadingProps>, HTMLAttributes<HTMLElement> {
  isOpen?: boolean;
}

const Loading = ({ size = "md", isOpen = true, ...rest }: LoadingProps) =>
  isOpen ? (
    <StyledLoading {...rest} size={size}>
      <div className="spinner" />
    </StyledLoading>
  ) : null;

export default Loading;
