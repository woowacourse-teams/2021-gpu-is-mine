import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GpuIcon, Text } from "../../components";
import { StyledLayout, LogoContainer } from "./MemberLayout.styled";
import { PATH } from "../../constants";

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
          <Text as="h1" size="xl" weight="bold">
            GPU 내껀데
          </Text>
        </LogoContainer>
      </Link>
    }
    Aside={null}
    Main={children}
  />
);

export default MemberLayout;
