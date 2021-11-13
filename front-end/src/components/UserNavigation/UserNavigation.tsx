import { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import Text from "../Text/Text";
import {
  StyledUserNavigation,
  Menu,
  LogoutMenu,
  MenuTitle,
  MenuItem,
} from "./UserNavigation.styled";
import { PATH } from "../../constants";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/member/authSlice";

type NavigationProps = HTMLAttributes<HTMLElement>;

const UserNavigation = (props: NavigationProps) => {
  const dispatch = useAppDispatch();
  const onLogout = () => dispatch(logout());

  return (
    <StyledUserNavigation {...props}>
      <Text as="h2" srOnly>
        서비스 목록
      </Text>

      <Menu forwardedAs="ol">
        <MenuTitle forwardedAs="h3" weight="medium">
          GPU 서버 관리
        </MenuTitle>
        <li>
          <NavLink to={PATH.GPU_SERVER.VIEW}>
            <MenuItem aria-label="gpu-server-view">조회</MenuItem>
          </NavLink>
        </li>
      </Menu>
      <Menu forwardedAs="ol">
        <MenuTitle forwardedAs="h3" weight="medium">
          나의 Job
        </MenuTitle>
        <li>
          <NavLink to={PATH.JOB.VIEW}>
            <MenuItem aria-label="job-view">조회</MenuItem>
          </NavLink>
        </li>
        <li>
          <NavLink to={PATH.JOB.REGISTER}>
            <MenuItem aria-label="job-register">등록</MenuItem>
          </NavLink>
        </li>
      </Menu>

      <LogoutMenu forwardedAs="ol">
        <Text as="h3" srOnly>
          로그아웃
        </Text>
        <li>
          <button type="button" onClick={onLogout}>
            <MenuItem weight="medium">로그아웃</MenuItem>
          </button>
        </li>
      </LogoutMenu>
    </StyledUserNavigation>
  );
};

export default UserNavigation;
