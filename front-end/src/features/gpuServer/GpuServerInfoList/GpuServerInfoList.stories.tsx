import { ComponentMeta, ComponentStory } from "@storybook/react";
import GpuServerInfoList from "./GpuServerInfoList";

export default {
  title: "Domains/GpuServer/InfoList",
  component: GpuServerInfoList,
} as ComponentMeta<typeof GpuServerInfoList>;

const Template: ComponentStory<typeof GpuServerInfoList> = (args) => (
  <GpuServerInfoList {...args} />
);

export const Default = Template.bind({});

Default.args = {};
