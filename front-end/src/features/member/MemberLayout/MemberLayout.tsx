import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GpuIcon } from "../../../components";
import { StyledLayout, LogoContainer, StyledText } from "./MemberLayout.styled";
import { PATH } from "../../../constants";

interface MemberLayoutProps {
  children: ReactNode;
  className?: string;
}

const MemberLayout = ({ children, ...rest }: MemberLayoutProps) => (
  <StyledLayout
    {...rest}
    Header={null}
    SubHeader={
      <Link to={PATH.MEMBER.LOGIN}>
        <LogoContainer>
          <GpuIcon size="xl" />
          <StyledText forwardedAs="h1" size="xl" weight="bold">
            <span>GPU</span>
            <span>내껀데</span>
          </StyledText>
        </LogoContainer>
      </Link>
    }
    Aside={null}
    Main={children}
  />
);

export default MemberLayout;
