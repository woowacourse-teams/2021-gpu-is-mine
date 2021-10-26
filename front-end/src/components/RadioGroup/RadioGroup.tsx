import { ReactNode } from "react";
import Text from "../Text/Text";
import { StyledRadioGroup, Title, ValidationMessage } from "./RadioGroup.styled";

interface RadioGroupProps {
  label: string;
  labelSize?: "sm" | "md" | "lg";
  className?: string;
  validationMessage?: string;
  children: ReactNode;
}

const validationMessageSize = {
  sm: "xs",
  md: "sm",
  lg: "md",
} as const;

const RadioGroup = ({
  label,
  labelSize = "sm",
  children,
  validationMessage,
  ...rest
}: RadioGroupProps) => (
  <StyledRadioGroup {...rest}>
    <Title>
      <Text size={labelSize}>{label}</Text>
      <ValidationMessage size={validationMessageSize[labelSize]} weight="medium">
        {validationMessage}
      </ValidationMessage>
    </Title>

    {children}
  </StyledRadioGroup>
);

export default RadioGroup;
