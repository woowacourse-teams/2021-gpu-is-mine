import { ChangeEventHandler, ReactNode } from "react";
import Radio from "../Radio/Radio";
import Text from "../Text/Text";
import { Container } from "./RadioGroup.styled";

interface option {
  value: string | number;
  contents: ReactNode;
}

interface RadioGroupProps {
  name: string;
  label: string;
  labelSize?: "sm" | "md" | "lg";
  selectedValue: string | number;
  options: option[];
  onChange: ChangeEventHandler;
}

const RadioGroup = ({
  name,
  label,
  labelSize = "md",
  selectedValue,
  options,
  onChange,
}: RadioGroupProps) => {
  return (
    <Container>
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
    </Container>
  );
};

export default RadioGroup;
