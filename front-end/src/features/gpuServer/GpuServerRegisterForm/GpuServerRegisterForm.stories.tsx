import { ComponentStory, ComponentMeta } from "@storybook/react";

import GpuServerRegisterForm from "./GpuServerRegisterForm";

export default {
  title: "Domains/GpuServer/RegisterForm",
  component: GpuServerRegisterForm,
} as ComponentMeta<typeof GpuServerRegisterForm>;

const Template: ComponentStory<typeof GpuServerRegisterForm> = () => <GpuServerRegisterForm />;

export const Default = Template.bind({});

Default.args = {};
