import { ComponentMeta, ComponentStory } from "@storybook/react";
import GpuServerRegister from "./GpuServerRegister";

export default {
  title: "Pages/Manager/GpuServerRegister",
  component: GpuServerRegister,
} as ComponentMeta<typeof GpuServerRegister>;

const Template: ComponentStory<typeof GpuServerRegister> = () => <GpuServerRegister />;

export const Default = Template.bind({});

Default.args = {};
