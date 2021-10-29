import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PATH } from "../../../constants";
import { GpuIcon } from "../../../components";
import { useBreakpoints } from "../../../hooks";
import { StyledLayout, LogoContainer, StyledText } from "./MemberLayout.styled";

interface MemberLayoutProps {
  children: ReactNode;
  className?: string;
}

const MemberLayout = ({ children, ...rest }: MemberLayoutProps) => {
  const { isMobile } = useBreakpoints();

  const logoSize = isMobile ? "lg" : "xl";

  return (
    <StyledLayout
      {...rest}
      Header={null}
      SubHeader={
        <Link to={PATH.MEMBER.LOGIN}>
          <LogoContainer>
            <GpuIcon size={logoSize} />
            <StyledText forwardedAs="h1" size={logoSize} weight="bold">
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
};

export default MemberLayout;
