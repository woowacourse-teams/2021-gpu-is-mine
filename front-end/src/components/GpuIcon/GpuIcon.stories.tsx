import { ComponentStory, ComponentMeta } from "@storybook/react";

import GpuIcon from "./GpuIcon";

export default {
  title: "Components/GpuIcon",
  component: GpuIcon,
} as ComponentMeta<typeof GpuIcon>;

const Template: ComponentStory<typeof GpuIcon> = (args) => <GpuIcon {...args} />;

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
