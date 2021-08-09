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
      <Menu>
        <MenuTitle as="div" weight="medium">
          GPU 서버 관리
        </MenuTitle>
        <NavLink to={PATH.USER.GPU_SERVER.VIEW}>
          <MenuItem as="div" aria-label="gpu-server-view">
            조회
          </MenuItem>
        </NavLink>
      </Menu>
      <Menu>
        <MenuTitle as="div" weight="medium">
          Job 관리
        </MenuTitle>
        <NavLink to={PATH.USER.JOB.VIEW}>
          <MenuItem as="div" aria-label="job-view">
            조회
          </MenuItem>
        </NavLink>
        <NavLink to={PATH.USER.JOB.REGISTER}>
          <MenuItem as="div" aria-label="job-register">
            등록
          </MenuItem>
        </NavLink>
      </Menu>
      <Menu>
        <MenuTitle as="div" weight="medium">
          내 정보
        </MenuTitle>
        <MenuItem as="div">조회</MenuItem>
        <MenuItem as="div">수정</MenuItem>
      </Menu>

      <LogoutMenu>
        <button type="button" onClick={logout}>
          <MenuItem as="div" weight="medium">
            로그아웃
          </MenuItem>
        </button>
      </LogoutMenu>
    </StyledUserNavigation>
  );
};

export default UserNavigation;
