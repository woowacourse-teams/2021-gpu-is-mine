import { ComponentStory, ComponentMeta } from "@storybook/react";

import GpuServerSelectItem from "./GpuServerSelectItem";

export default {
  title: "Domains/GpuServer/GpuServerSelectItem",
  component: GpuServerSelectItem,
} as ComponentMeta<typeof GpuServerSelectItem>;

const Template: ComponentStory<typeof GpuServerSelectItem> = (args) => (
  <GpuServerSelectItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  serverName: "GPU 서버",
  isOn: true,
  performance: 2000,
  jobCount: 15,
  remainingTime: 200,
};

export const LongItem = Template.bind({});

LongItem.args = {
  serverName: "일이삼사오육칠팔구공일이삼사오",
  isOn: true,
  performance: 20000,
  jobCount: 1000000000000,
  remainingTime: 2000000000,
};
