import { ComponentStory, ComponentMeta } from "@storybook/react";
import Text from "./Text";

export default {
  title: "Components/Text/fontWeight",
  component: Text,
} as ComponentMeta<typeof Text>;

const testString = `모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다.

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
`;
const Template: ComponentStory<typeof Text> = (args) => <Text {...args}>{testString}</Text>;

export const Default = Template.bind({});

Default.args = {};

export const Thin = Template.bind({});

Thin.args = {
  weight: "thin",
};

export const Light = Template.bind({});

Light.args = {
  weight: "light",
};

export const Regular = Template.bind({});

Regular.args = {
  weight: "regular",
};

export const Medium = Template.bind({});

Medium.args = {
  weight: "medium",
};

export const Bold = Template.bind({});

Bold.args = {
  weight: "bold",
};

export const Black = Template.bind({});

Black.args = {
  weight: "black",
};
