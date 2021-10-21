import { ReactNode } from "react";
import Text from "../Text/Text";
import {
  StyledLayout,
  HeaderContainer,
  SubHeaderContainer,
  AsideContainer,
  MainContainer,
  FooterContainer,
} from "./Layout.styled";

interface LayoutProps {
  Header: ReactNode;
  SubHeader: ReactNode;
  Aside: ReactNode;
  Main: ReactNode;
  Footer?: ReactNode;
  className?: string;
}

const Layout = ({
  Header,
  SubHeader,
  Aside,
  Main,
  Footer = (
    <Text as="span" size="sm" weight="medium" color="dark">
      ⓒ 2021 GPU내껀데
    </Text>
  ),
  className,
}: LayoutProps) => (
  <StyledLayout className={className}>
    <HeaderContainer>{Header}</HeaderContainer>
    <SubHeaderContainer>{SubHeader}</SubHeaderContainer>
    <MainContainer>{Main}</MainContainer>
    <AsideContainer>{Aside}</AsideContainer>
    <FooterContainer>{Footer}</FooterContainer>
  </StyledLayout>
);

export default Layout;
