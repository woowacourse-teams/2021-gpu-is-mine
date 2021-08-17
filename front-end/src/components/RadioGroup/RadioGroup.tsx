import { ReactNode } from "react";
import Text from "../Text/Text";
import { StyledRadioGroup } from "./RadioGroup.styled";

interface RadioGroupProps {
  label: string;
  labelSize?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

const RadioGroup = ({ label, labelSize = "sm", children, ...rest }: RadioGroupProps) => (
  <StyledRadioGroup {...rest}>
    <Text size={labelSize}>{label}</Text>

    {children}
  </StyledRadioGroup>
);

export default RadioGroup;
