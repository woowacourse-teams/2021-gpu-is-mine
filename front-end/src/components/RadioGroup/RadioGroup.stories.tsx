import { ComponentStory, ComponentMeta } from "@storybook/react";
import RadioGroup from "./RadioGroup";
import Radio from "../Radio/Radio";

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => <RadioGroup {...args} />;

export const Default = Template.bind({});

const defaultName = "default";
const defaultOnChange = () => {};

Default.args = {
  label: "LABEL",
  children: (
    <>
      <Radio name={defaultName} onChange={defaultOnChange} checked value={1}>
        radio 1
      </Radio>
      <Radio checked={false} name={defaultName} onChange={defaultOnChange} value={2}>
        radio 2
      </Radio>
      <Radio name={defaultName} checked={false} onChange={defaultOnChange} value={3}>
        radio 3
      </Radio>
      <Radio name={defaultName} checked={false} onChange={defaultOnChange} value={4}>
        radio 4
      </Radio>
      <Radio name={defaultName} checked={false} onChange={defaultOnChange} value={5}>
        radio 5
      </Radio>
    </>
  ),
};
