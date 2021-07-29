import { ReactNode } from "react";
import { GpuIcon, Text } from "../../components";
import { StyledLayout, LogoContainer } from "./MemberLayout.styled";

interface MemberLayoutProps {
  children: ReactNode;
  className?: string;
}

const MemberLayout = ({ children, ...rest }: MemberLayoutProps) => (
  <StyledLayout
    {...rest}
    Header={null}
    SubHeader={
      <LogoContainer>
        <GpuIcon size="xl" />
        <Text size="xl" weight="bold">
          GPU 내껀데
        </Text>
      </LogoContainer>
    }
    Navigation={null}
    Content={children}
  />
);

export default MemberLayout;
