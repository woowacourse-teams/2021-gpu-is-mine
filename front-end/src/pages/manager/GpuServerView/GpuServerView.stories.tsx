import { ComponentMeta, ComponentStory } from "@storybook/react";
import GpuServerView from "./GpuServerView";

export default {
  title: "Pages/Manager/GpuServer",
  component: GpuServerView,
} as ComponentMeta<typeof GpuServerView>;

const Template: ComponentStory<typeof GpuServerView> = () => <GpuServerView />;

export const View = Template.bind({});

View.args = {};
