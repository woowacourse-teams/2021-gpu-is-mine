import { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { Text } from "../../components";
import { StyledManagerNavigation } from "./ManagerNavigation.styled";
import { PATH } from "../../constants";

type NavigationProps = HTMLAttributes<HTMLElement>;

const ManagerNavigation = (props: NavigationProps) => (
  <StyledManagerNavigation {...props}>
    <section className="menu">
      <Text weight="medium" className="menu__title">
        GPU 서버 관리
      </Text>
      <NavLink to={PATH.MANAGER.GPU_SERVER.VIEW}>
        <Text className="menu__item" aria-label="gpu-server-view">
          조회
        </Text>
      </NavLink>
      <NavLink to={PATH.MANAGER.GPU_SERVER.REGISTER}>
        <Text className="menu__item" aria-label="gpu-server-register">
          등록
        </Text>
      </NavLink>
    </section>
    <section className="menu">
      <Text weight="medium" className="menu__title">
        Job 관리
      </Text>
      <NavLink to={PATH.MANAGER.JOB.VIEW}>
        <Text className="menu__item" aria-label="job-view">
          조회
        </Text>
      </NavLink>
      <NavLink to={PATH.MANAGER.JOB.REGISTER}>
        <Text className="menu__item" aria-label="job-register">
          등록
        </Text>
      </NavLink>
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
