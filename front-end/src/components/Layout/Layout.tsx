import { ReactNode } from "react";
import { StyledLayout } from "./Layout.styled";

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
    <div className="header">{Header}</div>
    <div className="sub-header">{SubHeader}</div>
    <div className="nav">{Navigation}</div>
    <main className="content">{Content}</main>
    <footer className="footer">{Footer}</footer>
  </StyledLayout>
);
export default Layout;
