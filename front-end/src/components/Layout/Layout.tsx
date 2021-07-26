import { ReactNode } from "react";
import {
  StyledLayout,
  HeaderContainer,
  SubHeaderContainer,
  NavContainer,
  ContentContainer,
  FooterContainer,
} from "./Layout.styled";

interface LayoutProps {
  Header: ReactNode;
  SubHeader: ReactNode;
  Navigation: ReactNode;
  Content: ReactNode;
  Footer?: ReactNode;
}

const Layout = ({
  Header,
  SubHeader,
  Navigation,
  Content,
  Footer = <span>All Rights Reserved gpu-is-mine</span>,
}: LayoutProps) => (
  <StyledLayout>
    <HeaderContainer>{Header}</HeaderContainer>
    <SubHeaderContainer>{SubHeader}</SubHeaderContainer>
    <NavContainer>{Navigation}</NavContainer>
    <ContentContainer>{Content}</ContentContainer>
    <FooterContainer>{Footer}</FooterContainer>
  </StyledLayout>
);

export default Layout;
