import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./Button";

export default {
  title: "Components/Button/Size",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>추가</Button>;

export const Primary = Template.bind({});

Primary.args = {
  color: "primary",
};

export const PrimaryLight = Template.bind({});

PrimaryLight.args = {
  color: "primary-light",
};

export const PrimaryDark = Template.bind({});

PrimaryDark.args = {
  color: "primary-dark",
};

export const Secondary = Template.bind({});

Secondary.args = {
  color: "secondary",
};

export const SecondaryLight = Template.bind({});

SecondaryLight.args = {
  color: "secondary-light",
};

export const SecondaryDark = Template.bind({});

SecondaryDark.args = {
  color: "secondary-dark",
};

export const Error = Template.bind({});

Error.args = {
  color: "error",
};
