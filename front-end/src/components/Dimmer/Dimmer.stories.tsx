import { ComponentStory, ComponentMeta } from "@storybook/react";

import Dimmer from "./Dimmer";

export default {
  title: "Components/Dimmer",
  component: Dimmer,
} as ComponentMeta<typeof Dimmer>;

const Template: ComponentStory<typeof Dimmer> = (args) => <Dimmer {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: null,
};

export const Transparent = Template.bind({});

Transparent.args = {
  children: null,
  color: "transparent",
};

export const Light = Template.bind({});

Light.args = {
  children: null,
  color: "light",
};

export const Dark = Template.bind({});

Dark.args = {
  children: null,
  color: "dark",
};
