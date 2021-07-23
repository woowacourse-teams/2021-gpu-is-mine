import { ChangeEventHandler, ReactNode } from "react";
import Radio from "../Radio/Radio";
import Text from "../Text/Text";
import { StyledRadioGroup } from "./RadioGroup.styled";

interface Option {
  value: string | number;
  contents: ReactNode;
}

interface RadioGroupProps {
  name: string;
  label: string;
  labelSize?: "sm" | "md" | "lg";
  value: string | number;
  options: Option[];
  onChange: ChangeEventHandler;
}

const RadioGroup = ({
  name,
  label,
  labelSize = "md",
  value: selectedValue,
  options,
  onChange,
}: RadioGroupProps) => (
  <StyledRadioGroup>
    <Text size={labelSize} className="label">
      {label}
    </Text>
    {options.map(({ value, contents }) => (
      <Radio
        key={value}
        name={name}
        value={value}
        checked={value === selectedValue}
        onChange={onChange}
      >
        {contents}
      </Radio>
    ))}
  </StyledRadioGroup>
);

export default RadioGroup;
