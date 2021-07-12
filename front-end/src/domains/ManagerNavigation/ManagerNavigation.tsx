import { HTMLAttributes } from "react";
import Text from "../../components/Text/Text";
import { StyledManagerNavigation } from "./ManagerNavigation.styled";

type NavigationProps = HTMLAttributes<HTMLElement>;

const ManagerNavigation = (props: NavigationProps) => (
  <StyledManagerNavigation {...props}>
    <section className="menu">
      <Text weight="medium" className="menu__title">
        GPU 서버 관리
      </Text>
      <Text className="menu__item active">조회</Text>
      <Text className="menu__item">등록</Text>
    </section>
    <section className="menu">
      <Text weight="medium" className="menu__title">
        유저 관리
      </Text>
      <Text className="menu__item">조회</Text>
      <Text className="menu__item">등록</Text>
    </section>

    <section className="menu menu-login">
      <Text weight="medium" className="menu__title">
        로그인
      </Text>
    </section>
  </StyledManagerNavigation>
);

export default ManagerNavigation;
