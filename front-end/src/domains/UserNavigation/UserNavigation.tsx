import { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";
import {
  StyledUserNavigation,
  Menu,
  LogoutMenu,
  MenuTitle,
  MenuItem,
} from "./UserNavigation.styled";
import { PATH } from "../../constants";

type NavigationProps = HTMLAttributes<HTMLElement>;

const UserNavigation = (props: NavigationProps) => {
  const { logout } = useAuth();

  return (
    <StyledUserNavigation {...props}>
      <Menu forwardedAs="div">
        <MenuTitle forwardedAs="div" weight="medium">
          GPU 서버 관리
        </MenuTitle>
        <NavLink to={PATH.GPU_SERVER.VIEW}>
          <MenuItem forwardedAs="div" aria-label="gpu-server-view">
            조회
          </MenuItem>
        </NavLink>
      </Menu>
      <Menu forwardedAs="div">
        <MenuTitle forwardedAs="div" weight="medium">
          나의 Job
        </MenuTitle>
        <NavLink to={PATH.JOB.VIEW}>
          <MenuItem forwardedAs="div" aria-label="job-view">
            조회
          </MenuItem>
        </NavLink>
        <NavLink to={PATH.JOB.REGISTER}>
          <MenuItem forwardedAs="div" aria-label="job-register">
            등록
          </MenuItem>
        </NavLink>
      </Menu>
      <Menu forwardedAs="div">
        <MenuTitle forwardedAs="div" weight="medium">
          내 정보
        </MenuTitle>
        <MenuItem forwardedAs="div">조회</MenuItem>
        <MenuItem forwardedAs="div">수정</MenuItem>
      </Menu>

      <LogoutMenu>
        <button type="button" onClick={logout}>
          <MenuItem forwardedAs="div" weight="medium">
            로그아웃
          </MenuItem>
        </button>
      </LogoutMenu>
    </StyledUserNavigation>
  );
};

export default UserNavigation;
