import { ComponentStory, ComponentMeta } from "@storybook/react";

import GpuServerAddForm from "./GpuServerAddForm";

export default {
  title: "Domains/GpuServer/AddForm",
  component: GpuServerAddForm,
} as ComponentMeta<typeof GpuServerAddForm>;

const Template: ComponentStory<typeof GpuServerAddForm> = () => <GpuServerAddForm />;

export const Default = Template.bind({});

Default.args = {};
