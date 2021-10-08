import { ComponentMeta, ComponentStory } from "@storybook/react";
import GpuServerViewDetail from "./GpuServerViewDetail";

export default {
  title: "Pages/GpuServerViewDetail",
  component: GpuServerViewDetail,
} as ComponentMeta<typeof GpuServerViewDetail>;

const Template: ComponentStory<typeof GpuServerViewDetail> = () => <GpuServerViewDetail />;

export const Default = Template.bind({});

Default.args = {};
