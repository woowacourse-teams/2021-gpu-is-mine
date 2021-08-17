import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from "./Input";

export default {
  title: "Components/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: "GPU 서버 이름",
};

export const Error = Template.bind({});

Error.args = {
  label: "GPU 서버 이름",
  value: "abcd",
  validationMessage: "한글만 입력 가능합니다.",
  onChange: () => {},
};

export const Small = Template.bind({});

Small.args = {
  label: "GPU 서버 이름",
  size: "sm",
};

export const Medium = Template.bind({});

Medium.args = {
  label: "GPU 서버 이름",
  size: "md",
};

export const Large = Template.bind({});

Large.args = {
  label: "GPU 서버 이름",
  size: "lg",
};
