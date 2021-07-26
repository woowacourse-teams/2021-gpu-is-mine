import { ComponentStory, ComponentMeta } from "@storybook/react";

import Flicker from "./Flicker";

export default {
  title: "Components/Flicker",
  component: Flicker,
} as ComponentMeta<typeof Flicker>;

const Template: ComponentStory<typeof Flicker> = (args) => <Flicker {...args} />;

export const OnFlicker = Template.bind({});

OnFlicker.args = {
  status: "ON",
};

export const WarningFlicker = Template.bind({});

WarningFlicker.args = {
  status: "WARNING",
};

export const OffFlicker = Template.bind({});

OffFlicker.args = {
  status: "OFF",
};

export const OnLargeFlicker = Template.bind({});

OnLargeFlicker.args = {
  status: "ON",
  size: "lg",
};

export const WarningSmallFlicker = Template.bind({});

WarningSmallFlicker.args = {
  status: "WARNING",
  size: "sm",
};

export const OffExtraSmallFlicker = Template.bind({});

OffExtraSmallFlicker.args = {
  status: "WARNING",
  size: "sm",
};
