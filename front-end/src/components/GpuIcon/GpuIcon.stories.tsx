import { ComponentStory, ComponentMeta } from "@storybook/react";

import GpuIcon from "./GpuIcon";

export default {
  title: "Test/GpuIcon",
  component: GpuIcon,
} as ComponentMeta<typeof GpuIcon>;

const Template: ComponentStory<typeof GpuIcon> = (args) => <GpuIcon {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
