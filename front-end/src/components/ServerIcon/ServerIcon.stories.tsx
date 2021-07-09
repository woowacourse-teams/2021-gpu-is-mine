import { ComponentStory, ComponentMeta } from "@storybook/react";

import ServerIcon from "./ServerIcon";

export default {
  title: "Components/ServerIcon",
  component: ServerIcon,
} as ComponentMeta<typeof ServerIcon>;

const Template: ComponentStory<typeof ServerIcon> = (args) => <ServerIcon {...args} />;

export const Default = Template.bind({});

Default.args = {};

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
