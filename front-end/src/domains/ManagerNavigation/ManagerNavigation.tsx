import { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { Text } from "../../components";
import { StyledManagerNavigation } from "./ManagerNavigation.styled";
import { PATH } from "../../constants";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/member/memberSlice";

type NavigationProps = HTMLAttributes<HTMLElement>;

const ManagerNavigation = (props: NavigationProps) => {
  const dispatch = useAppDispatch();
  const onLogout = () => dispatch(logout());

  return (
    <StyledManagerNavigation {...props}>
      <Text as="h2" srOnly>
        서비스 목록
      </Text>
      <ol className="menu">
        <Text as="h3" weight="medium" className="menu__title">
          GPU 서버 관리
        </Text>
        <li>
          <NavLink to={PATH.GPU_SERVER.VIEW}>
            <Text className="menu__item" aria-label="gpu-server-view">
              조회
            </Text>
          </NavLink>
        </li>
        <li>
          <NavLink to={PATH.GPU_SERVER.REGISTER}>
            <Text className="menu__item" aria-label="gpu-server-register">
              등록
            </Text>
          </NavLink>
        </li>
      </ol>
      <ol className="menu">
        <Text as="h3" weight="medium" className="menu__title">
          Job 관리
        </Text>
        <li>
          <NavLink to={PATH.JOB.VIEW}>
            <Text className="menu__item" aria-label="job-view">
              조회
            </Text>
          </NavLink>
        </li>
        <li>
          <NavLink to={PATH.JOB.REGISTER}>
            <Text className="menu__item" aria-label="job-register">
              등록
            </Text>
          </NavLink>
        </li>
      </ol>
      <ol className="menu">
        <Text as="h3" weight="medium" className="menu__title">
          유저 관리
        </Text>
        <li>
          <Text className="menu__item">조회</Text>
        </li>
        <li>
          <Text className="menu__item">등록</Text>
        </li>
      </ol>

      <ol className="menu menu-logout">
        <Text as="h3" srOnly>
          로그아웃
        </Text>
        <li>
          <button type="button" onClick={onLogout}>
            <Text weight="medium" className="menu__item">
              로그아웃
            </Text>
          </button>
        </li>
      </ol>
    </StyledManagerNavigation>
  );
};

export default ManagerNavigation;
