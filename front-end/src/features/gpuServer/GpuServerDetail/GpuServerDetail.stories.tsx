import { ComponentStory, ComponentMeta } from "@storybook/react";
import GpuServerDetail from "./GpuServerDetail";

export default {
  title: "Domains/GpuServer/Detail",
  component: GpuServerDetail,
} as ComponentMeta<typeof GpuServerDetail>;

const Template: ComponentStory<typeof GpuServerDetail> = (args) => <GpuServerDetail {...args} />;

export const Default = Template.bind({});

Default.args = {};
