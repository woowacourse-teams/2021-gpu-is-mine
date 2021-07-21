import { ComponentMeta, ComponentStory } from "@storybook/react";
import GpuServerView from "./GpuServerView";

export default {
  title: "Pages/Manager/GpuServerView",
  component: GpuServerView,
} as ComponentMeta<typeof GpuServerView>;

const Template: ComponentStory<typeof GpuServerView> = () => <GpuServerView />;

export const Default = Template.bind({});

Default.args = {};
