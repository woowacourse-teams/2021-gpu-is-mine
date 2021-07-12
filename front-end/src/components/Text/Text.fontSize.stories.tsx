import { ComponentStory, ComponentMeta } from "@storybook/react";
import Text from "./Text";

export default {
  title: "Components/Text/fontSize",
  component: Text,
} as ComponentMeta<typeof Text>;

const testString = `모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
`;
const Template: ComponentStory<typeof Text> = (args) => <Text {...args}>{testString}</Text>;

export const Default = Template.bind({});

Default.args = {};

export const ExtraSmall = Template.bind({});

ExtraSmall.args = {
  size: "xs",
};

export const Small = Template.bind({});

Small.args = {
  size: "sm",
};

export const Medium = Template.bind({});

Medium.args = {
  size: "md",
};

export const Large = Template.bind({});

Large.args = {
  size: "lg",
};

export const ExtraLarge = Template.bind({});

ExtraLarge.args = {
  size: "xl",
};

export const $2ExtraLarge = Template.bind({});

$2ExtraLarge.args = {
  size: "2xl",
};
