import { ComponentProps } from "react";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";

const AdminHeader = ({ labName, ...rest }: ComponentProps<typeof Header>) => (
  <Header labName={labName} {...rest}>
    <Navigation menu={["GPU 서버 관리", "유저 관리"]} />
  </Header>
);

export default AdminHeader;
