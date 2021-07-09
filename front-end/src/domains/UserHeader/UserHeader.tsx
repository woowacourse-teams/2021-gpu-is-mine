import { ComponentProps } from "react";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";

const UserHeader = ({ labName, ...rest }: ComponentProps<typeof Header>) => (
  <Header labName={labName} {...rest}>
    <Navigation menu={["Job 현황", "GPU 서버 현황", "예약하기"]} />
  </Header>
);

export default UserHeader;
