import { HTMLAttributes } from "react";
import Text from "../Text/Text";
import { StyledNavigation } from "./Navigation.styled";

interface NavigationProps extends HTMLAttributes<HTMLElement> {
  menu: string[];
}

const Navigation = ({ menu, ...rest }: NavigationProps) => (
  <StyledNavigation {...rest}>
    {menu.map((name) => (
      <Text>{name}</Text>
    ))}
  </StyledNavigation>
);

export default Navigation;
